import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name: 'activityRecords.single', path: 'activity-records/:_id', componentName: 'ActivityRecordsSingle'},
]);
