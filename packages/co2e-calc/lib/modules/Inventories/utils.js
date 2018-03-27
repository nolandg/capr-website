import { getCollection } from 'meteor/vulcan:core';
import { getRecordsAffectingInventory, getInventoriesAffectedByRecord } from '../utils.js';
import _ from 'lodash';
// import moment from 'moment';

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
    const records = await getRecordsAffectingInventory(inventory);
    // Either remove or update the this record for which the callback was called
    records.forEach((record, index) => {
      if(record._id === newRecord._id){
        if(remove) records.splice(index, 1);
        else records[index] = newRecord;
      }
    });

    const chartData = calcChartData(inventory, records);
    await Inventories.update(inventory._id, {$set: {chartData}});
  }
}

const calcChartData = (inventory, records) => {
  const chartData = {
    debug: Math.random(),
  };
  return chartData;
}
