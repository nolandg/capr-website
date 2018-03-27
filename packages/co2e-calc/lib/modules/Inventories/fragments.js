import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment Inventory on Inventory {
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
      ...UsersMinimumInfo
    }
  }
`);
