import { runQuery } from 'meteor/vulcan:core';
import moment from 'moment';

const getInventoriesAffectedByRecord = async (record) => {
  const terms = {
    view: 'userDateRange',
    userId: record.user_id,
    startDate: record.startDate,
    endDate: record.endDate,
  };

  const query = `
    query MyQuery($terms: JSON){
      InventoriesList(terms: $terms){
        _id
        startDate
        endDate
        postalCode
        homeArea
        homeAreaUnits
        homeAreaUnits
        homeOccupantCount
        user{
          _id
          username
          displayName
        }
      }
    }
  `;
  const results = await runQuery(query, {terms: terms});
  return results.data.InventoriesList;
}

const getRecordsAffectingInventory = async (inventory) => {
  const terms = {
    view: 'userDateRange',
    userId: inventory.user_id,
    startDate: inventory.startDate,
    endDate: inventory.endDate,
  };

  const query = `
    query MyQuery($terms: JSON){
      ActivityRecordsList(terms: $terms){
        _id
        activity
        label
        startDate
        endDate
        co2e
        dayCount
      }
    }
  `;

  const results = await runQuery(query, {terms: terms});
  return results.data.ActivityRecordsList;
}

export const calcInventoryData = async (record) => {
  const inventories = await getInventoriesAffectedByRecord(record);

  inventories.forEach(async inventory => {
    const year = moment(inventory.startDate).year();
    const records = await getRecordsAffectingInventory(record);
    console.log(`----------- Inventory for ${year} has ${records.length} records ------------`);
    records.forEach(record => {
      console.log(`     Record: ${record.activity} for ${Math.ceil(record.co2e)} kg`);
    });
  });
}
