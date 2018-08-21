import Users from 'meteor/vulcan:users';

const guestsActions = [
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'inventories.new',
  'inventories.edit.own',
  'inventories.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'inventories.edit.all',
  'inventories.remove.all'
];
Users.groups.admins.can(adminActions);

const adminTier2Actions = [
  'inventories.edit.all',
  'inventories.remove.all'
];
Users.groups.adminTier2.can(adminTier2Actions);
