import Users from 'meteor/vulcan:users';

const guestsActions = [
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'activityrecords.new',
  'activityrecords.edit.own',
  'activityrecords.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'activityrecords.edit.all',
  'activityrecords.remove.all'
];
Users.groups.admins.can(adminActions);
