import { runQuery } from 'meteor/vulcan:core';
import moment from 'moment';

export const getMidpointMoment = (startDate, endDate) => {
  return moment(startDate).month(Math.floor((moment(startDate).month() + moment(endDate).month())/2))
}

export const getInventoriesAffectedByRecord = async (record) => {
  const terms = {
    view: 'userDateRange',
    userId: record.userId,
    startDate: record.startDate,
    endDate: record.endDate,
  };

  const query = `
    query FindInventoriesAffectedByRecord($terms: JSON){
      InventoriesList(terms: $terms){
        _id
        startDate
        endDate
        postalCode
        homeArea
        homeAreaUnits
        homeOccupantCount
        chartData
        # users
        userId
        user {
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

export const getInventoryIdsAffectedByRecord = async (record) => {
  const inventories = await getInventoriesAffectedByRecord(record);
  return inventories.map(i => i._id);
}

export const getRecordsAffectingInventory = async (inventory) => {
  const terms = {
    view: 'userDateRange',
    userId: inventory.userId,
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
        data
        # users
        userId
        user {
          _id
          username
          displayName
        }
      }
    }
  `;

  const results = await runQuery(query, {terms: terms});
  return results.data.ActivityRecordsList;
}

export const distanceBetweenLocationsInKm = (a, b) => {
  return distanceBetweenLatlngInKm(a.lat, a.lng, b.lat, b.lng);
}

export const distanceBetweenLatlngInKm = (lat1,lng1,lat2,lng2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dlng = deg2rad(lng2-lng1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dlng/2) * Math.sin(dlng/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return Math.ceil(d);
}

export const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}
