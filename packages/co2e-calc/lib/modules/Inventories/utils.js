import { getCollection } from 'meteor/vulcan:core';
import { getRecordsAffectingInventory, getInventoriesAffectedByRecord } from '../utils.js';
import _ from 'lodash';
import moment from 'moment';

export const updateInventoryData = async (record, modifier, currentUser, remove = false) => {
  const Inventories = getCollection('Inventories');
  const newRecord = modifier && modifier.$set ? {...record, ...modifier.$set} : record;
  const prevRecord = record;
  record = undefined;

  // Get inventories that might be affected by both the previous and new record
  let inventories = await getInventoriesAffectedByRecord(prevRecord);
  if(modifier && modifier.$set){
    inventories = _.unionBy(inventories, await getInventoriesAffectedByRecord(newRecord), i => i._id);
  }

  for(let inventory of inventories){
    // Assemble array of records affecting this inventory
    let records = await getRecordsAffectingInventory(inventory);
    records.forEach((record, index) => {
      if(record._id === newRecord._id){
        if(remove){
          records.splice(index, 1);
        }
      }
    });

    const chartData = calcChartData(inventory, records);
    await Inventories.update(inventory._id, {$set: {chartData}});
  }
}

const calcChartData = (inventory, records) => {
  const chartData = {
    debug: Math.random(),
    timelineData: massageTimelineData(inventory, records),
    totals: massageTotals(inventory, records),
  };
  return chartData;
}

const findRecordsIncludingDate = (date, records) => {
  return records.filter((record) => {
    return moment(date).isBetween(record.startDate, record.endDate, null, '[]');
  });
}

const calcTotalCo2eForEachActivityOnDate = (records, date) => {
  const simultaneousRecords = findRecordsIncludingDate(date, records);
  const activityTotals = {};
  const activityPercents = {};
  let allActivities = 0

  simultaneousRecords.forEach((record) => {
    const co2ePerDay = record.co2e/record.dayCount;

    // Add a new entry to data point if needed
    if(!activityTotals[record.activity]) activityTotals[record.activity] = 0;

    // Add to total emissions for this activity on this date
    activityTotals[record.activity] += co2ePerDay;

    // Add to total for all activities
    allActivities += co2ePerDay;
  });

  for(const key in activityTotals){
    activityPercents[key] = activityTotals[key] / allActivities * 100;
  }

  return {activityTotals, allActivities, activityPercents };
}

const massageTotals = (inventory, records) => {
  const inventoryStartDate = moment(inventory.startDate);
  const inventoryEndDate = moment(inventory.endDate);
  let seriesNames = [];
  const activityTotals = {};
  const activityPercents = {};
  let total = 0;

  records.forEach((record) => {
    const recordStartDate = moment(record.startDate);
    const recordEndDate = moment(record.endDate);
    const activity = record.activity;
    let valueToAdd = 0;

    // Check if this record falls completely within the inventory period
    if(recordStartDate.isSameOrAfter(inventoryStartDate) && recordEndDate.isSameOrBefore(inventoryEndDate)){
      // Entire record is within inventory, add the entire record's CO2e
      valueToAdd = record.co2e;
    }else{
      // Add only the days within this inventory
      const intersectStartDate = moment.max(inventoryStartDate, recordStartDate);
      const intersectEndDate = moment.min(inventoryEndDate, recordEndDate);
      const intersectLength = intersectEndDate.diff(intersectStartDate, 'days');
      const co2ePerDay = record.co2e/record.dayCount;
      valueToAdd = intersectLength * co2ePerDay;
    }

    // Add to this activity's total and to all activities total
    seriesNames = _.union(seriesNames, [activity]);
    if(!activityTotals[activity]) activityTotals[activity] = 0;
    activityTotals[activity] += valueToAdd;
    total += valueToAdd;
  });

  for(const key in activityTotals){
    activityPercents[key] = activityTotals[key]/total*100;
  }

  return {seriesNames, activityTotals, activityPercents, total};
}

const massageTimelineData = (inventory, records) => {
  // records = records.filter((record) => {
  //   return moment(record.startDate).isBetween(inventory.startDate, inventory.endDate, null, '[]') ||
  //          moment(record.endDate).isBetween(inventory.startDate, inventory.endDate, null, '[]');
  // });

  const data = [];
  const activitySeriesNames = [];
  let activityYValues = [];
  let dates = [];

  // Sort records from longest duration to shortest to ensure short ones
  // show up on top
  records.sort((a, b) => {
    return b.dayCount - a.dayCount;
  });

  //***** Activities *****//
  // Create short lines representing time spans covered by each record
  // Lines of for the same activity value have the same y (category) value
  // 'date' is the x value
  records.forEach((record) => {
    // Name this series based on its record id which should be unique
    const seriesName = record._id;
    // The y value is on a category axis. The activity name will be translated to text by the tick formatter
    const yValue = record.activity;

    // Add the start and end point of this line (which is the entire series) to the data used by Recharts/D3
    const startOfSeriesDataPoint = {[seriesName]: yValue, date: new Date(record.startDate).valueOf()};
    const endOfSeriesDataPoint = {[seriesName]: yValue, date: new Date(record.endDate).valueOf()};
    data.push(startOfSeriesDataPoint);
    data.push(endOfSeriesDataPoint);

    // We need to keep track of which series name was created in data for which record
    // so we can make line components for them late
    activitySeriesNames.push({
      seriesName,
      record,
    });

    // Keep track of all the unique y values so we can add grid lines etc. later
    activityYValues = _.union(activityYValues, [yValue]);

    // Keep track of each start and end date for emissions to use below
    dates.push(record.startDate);
    dates.push(record.endDate);
  });

  //***** Emissions *****//
  // Create a stacked area chart for emissions per day for each activity
  let emissionsSeriesNames = [];

  // Add extra dates before and after each start and end date of these records
  // Emissions will also be calculated on these dates to smooth the interpolation
  dates.forEach((date) => {
    dates.push(moment(date).subtract(1, 'days').toISOString())
    dates.push(moment(date).add(1, 'days').toISOString());
  });

  // Sort all the start and end dates for all records from earliest to latest
  dates.sort((a, b) => {
    if(moment(a).isBefore(b)) return -1;
    if(moment(a).isSame(b)) return 0;
    else return 1;
  });

  // Create a stacked area data point for each date
  // 'date' is the x value
  const dailyTotals = {}; // track daily totals for each day
  dates.forEach((date) => {
    const thisDayTotals = calcTotalCo2eForEachActivityOnDate(records, date);
    dailyTotals[moment(date).valueOf()] = thisDayTotals;

    data.push({
      date: moment(date).valueOf(),
      ...thisDayTotals.activityTotals,
    });

    // Track all the series names created so we can make areas for them later
    emissionsSeriesNames = _.union(emissionsSeriesNames, Object.keys(thisDayTotals.activityTotals));
  });

  return {
    data, activitySeriesNames, emissionsSeriesNames, activityYValues, dailyTotals,
    monthlyXTickValues: generateMonthlyXTickValues(inventory, records),
  };
}

const generateMonthlyXTickValues = (inventory, records) => {
  const year = moment(inventory.startDate).year();

  return [0,1,2,3,4,5,6,7,8,9,10,11].map((m)=>{
    return moment().year(year).month(m).date(1).valueOf();
  });
}
