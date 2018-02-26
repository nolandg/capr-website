import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment AcivityRecordsList on ActivityRecord {
    _id
    activity
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