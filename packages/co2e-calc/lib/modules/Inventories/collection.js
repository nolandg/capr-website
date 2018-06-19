import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations, addCallback } from 'meteor/vulcan:core';
import { updateInventoryData } from './utils.js';
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
  }  else if(Users.canDo(currentUser, 'core.admin')){
    return true;
  }else {
    return false;
  }
}

// Overley verbose syntax because of warnings about unnamed callback functions
async function handeActivityRecordEdit(modifier, record, currentUser){await updateInventoryData(record, modifier, currentUser); return modifier;}
async function handeActivityRecordNew(record, currentUser){await updateInventoryData(record, null, currentUser); return record;}
async function handeActivityRecordRemove(record, currentUser){await updateInventoryData(record, null, currentUser, true);}
addCallback('activityrecords.edit.after', handeActivityRecordEdit);
addCallback('activityrecords.new.after', handeActivityRecordNew);
addCallback('activityrecords.remove.before', handeActivityRecordRemove);
