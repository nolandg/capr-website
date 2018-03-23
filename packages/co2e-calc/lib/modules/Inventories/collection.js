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

// Overley verbose syntax because of warnings about unnamed callback functions
function handeActivityRecordEdit(record, prevRecord, currentUser){calcInventoryData(record, currentUser);}
function handeActivityRecordNew(record, currentUser){calcInventoryData(record, currentUser);}
function handeActivityRecordRemove(record, currentUser){calcInventoryData(record, currentUser);}
addCallback('activityrecords.edit.async', handeActivityRecordEdit);
addCallback('activityrecords.new.async', handeActivityRecordNew);
addCallback('activityrecords.remove.async', handeActivityRecordRemove);
