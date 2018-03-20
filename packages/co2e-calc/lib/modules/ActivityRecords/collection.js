import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import enumerations from '../enumerations';
import Utils from './utils';

export const ActivityRecords = createCollection({
  collectionName: 'ActivityRecords',
  typeName: 'ActivityRecord',
  schema,
  resolvers: getDefaultResolvers('ActivityRecords'),
  mutations: getDefaultMutations('ActivityRecords'),
});

ActivityRecords.config = {};

ActivityRecords.checkAccess = (currentUser, document) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, document)) {
    // admins can always see everything, users can always see their own records
    return true;
  }  else {
    return false;
  }
}

ActivityRecords.Utils = {
  ...enumerations,
  ...Utils,
};
