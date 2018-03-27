import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment ActivityRecord on ActivityRecord {
    _id
    activity
    label
    startDate
    endDate
    co2e
    dayCount
    data
    inventories {
      ...Inventory
    }
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
  }
`);
