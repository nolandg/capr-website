import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment AcivityRecordsList on ActivityRecord {
    _id
    activity
    label
    startDate
    endDate
    co2e
    dayCount
    data
    inventories
    inventoryObjects {
      _id
      homeArea
    }
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
  }
`);

// registerFragment(`
//   fragment ActivityRecordsPage on ActivityRecord {
//     ...ActivityRecordsList
//     body
//     htmlBody
//   }
// `);
