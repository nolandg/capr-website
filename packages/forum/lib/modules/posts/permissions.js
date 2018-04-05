/*

Posts permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'posts.view',
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'posts.edit.own',
  'posts.remove.own',
];
Users.groups.members.can(membersActions);

const adminTier2Actions = [
  'posts.view',
  'posts.new',
  'posts.edit.all',
  'posts.remove.all'
];
Users.groups.adminTier2.can(adminTier2Actions);

const adminActions = [
  'posts.view',
  'posts.new',
  'posts.edit.all',
  'posts.remove.all'
];
Users.groups.admins.can(adminActions);
