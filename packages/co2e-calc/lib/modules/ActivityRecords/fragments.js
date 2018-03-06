import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment AcivityRecordsList on ActivityRecord {
    _id
    activity
    startDate
    endDate
    co2e
    dayCount
    data
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
