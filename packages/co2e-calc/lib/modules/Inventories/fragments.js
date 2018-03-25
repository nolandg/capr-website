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
    emissionRecords
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
  }
`);

// emissionRecords {
//   _id
//   activity
//   co2e
// }
