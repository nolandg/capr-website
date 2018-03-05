import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import enumerationUtils from './enumerations';

export let ActivityRecords = createCollection({
  collectionName: 'ActivityRecords',
  typeName: 'ActivityRecord',
  schema,
  resolvers: getDefaultResolvers('ActivityRecords'),
  mutations: getDefaultMutations('ActivityRecords'),
});

ActivityRecords.config = {};

ActivityRecords.checkAccess = (currentUser, activity) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, activity)) {
    // admins can always see everything, users can always see their own records
    return true;
  }  else {
    return false;
  }
}

ActivityRecords.Utils = {
  ...enumerationUtils,
};
