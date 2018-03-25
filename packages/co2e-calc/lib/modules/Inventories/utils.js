import { getCollection } from 'meteor/vulcan:core';
// import { getInventoriesAffectedByRecord, getRecordsAffectingInventory } from '../utils.js';
import moment from 'moment';

export const calcInventoryData = async (record, modifier, currentUser, collection, context) => {
  const Inventories = getCollection('Inventories');

  const value = Math.random();
  // record.inventories.forEach(async (inventory, index) => {
  //   await Inventories.update(inventory, {$set: {homeArea: value}});
  // });

  const updateResults = await Inventories.update(record.inventories[0], {$set: {homeArea: value}});

  const inventoryObjects = await Inventories.loader.loadMany(record.inventories);
  // record.inventoryObjects = inventoryObjects;
  modifier.$set.inventoryObjects = inventoryObjects;

  // modifier.$set.inventories = record.inventories;
  // modifier.$set.data.energy = value * 1000;
  // // console.log(record);

  // record.inventoryObjects = [
  //   {homeArea: value},
  // ];
  //
  return modifier;
}
