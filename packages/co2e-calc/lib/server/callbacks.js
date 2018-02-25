import { Records } from '../../modules/records/index.js';
import Users from 'meteor/vulcan:users';
import { addCallback, getSetting, registerSetting } from 'meteor/vulcan:core';
import { createError } from 'apollo-errors';

function ActivityRecordsNewRateLimit (activity, user) {

  if(!Users.isAdmin(user)){

    var timeSinceLastActivityRecord = Users.timeSinceLast(user, ActivityRecords),
      numberOfActivityRecordsInPast24Hours = Users.numberOfItemsInPast24Hours(user, ActivityRecords),
      activityInterval = Math.abs(parseInt(getSetting('forum.activityInterval', 30))),
      maxActivityRecordsPer24Hours = Math.abs(parseInt(getSetting('forum.maxActivityRecordsPerDay', 5)));

    // check that user waits more than X seconds between activitys
    if(timeSinceLastActivityRecord < activityInterval){
      const RateLimitError = createError('activitys.rate_limit_error', {message: 'activitys.rate_limit_error'});
      throw new RateLimitError({data: {break: true, value: activityInterval-timeSinceLastActivityRecord}});
    }
    // check that the user doesn't activity more than Y activitys per day
    if(numberOfActivityRecordsInPast24Hours >= maxActivityRecordsPer24Hours){
      const RateLimitError = createError('activitys.max_per_day', {message: 'activitys.max_per_day'});
      throw new RateLimitError({data: {break: true, value: maxActivityRecordsPer24Hours}});
    }
  }

  return activity;
}
addCallback('activitys.new.validate', ActivityRecordsNewRateLimit);
