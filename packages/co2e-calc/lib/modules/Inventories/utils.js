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
    view: 'affectingRecord',
    userId: inventory.user_id,
    startDate: inventory.startDate,
    endDate: inventory.endDate,
  };

  const query = `
    query MyQuery($terms: JSON){
      ActivitiesRecordsList(terms: $terms){
        _id
        startDate
        endDate
      }
    }
  `;
  const results = await runQuery(query, {terms: terms});
  return results.data.InventoriesList;
}

export const calcInventoryData = async (modifier, record, currentUser, collection) => {
  const inventories = await getInventoriesAffectedByRecord(record);

  inventories.forEach(i => {
    console.log('Returned inentory for year: ', moment(i.startDate).year());
  });
}
