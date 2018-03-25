import moment from 'moment';
import { EmissionFactors } from '../EmissionFactors';

export const calcCo2e = (activityRecord) => {
  return EmissionFactors.calcCo2e(activityRecord);
}

export const calcNumberOfDays = (activityRecord) => {
  return moment(activityRecord.endDate).diff(moment(activityRecord.startDate), 'days');
}

export const findRecordsIncludingDate = (date, records) => {
  return records.filter((record) => {
    return moment(date).isBetween(record.startDate, record.endDate, null, '[]');
  });
}

export const calcTotalCo2eForEachActivityOnDate = (records, date) => {
  const simultaneousRecords = findRecordsIncludingDate(date, records);
  const co2eTotals = {};

  simultaneousRecords.forEach((record) => {
    const co2ePerDay = record.co2e/record.dayCount;

    // Add a new entry to data point if needed
    if(!co2eTotals[record.activity]) co2eTotals[record.activity] = 0;

    // Add to total emissions for this activity on this date
    co2eTotals[record.activity] += co2ePerDay;
  });

  return co2eTotals;
}

export const hashRecords = (records) => {
  if(!records || !records.length) return '';
  const string = JSON.stringify(records);

  let hash = 0;
  if(string.length === 0) {
    return hash;
  }

  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}
