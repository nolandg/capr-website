import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment InventoriesList on Inventory {
    _id
    startDate
    endDate
    postalCode
    homeArea
    homeAreaUnits
    homeOccupantCount
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
  }
`);
