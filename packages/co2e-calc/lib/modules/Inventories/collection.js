import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations, addCallback } from 'meteor/vulcan:core';
import { calcInventoryData } from './utils.js';
import Users from 'meteor/vulcan:users';

export const Inventories = createCollection({
  collectionName: 'Inventories',
  typeName: 'Inventory',
  schema,
  resolvers: getDefaultResolvers('Inventories'),
  mutations: getDefaultMutations('Inventories'),
});

Inventories.checkAccess = (currentUser, document) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, document)) {
    // admins can always see everything, users can always see their own records
    return true;
  }  else {
    return false;
  }
}

addCallback('activityrecords.edit.async', calcInventoryData);
