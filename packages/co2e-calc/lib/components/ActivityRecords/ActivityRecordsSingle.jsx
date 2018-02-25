import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const ActivityRecordsSingle = (props, context) => {
  return <Components.ActivityRecordsPageView documentId={props.params._id} />
};

registerComponent('ActivityRecordsSingle', ActivityRecordsSingle);
