import { Components, registerComponent, withDocument } from 'meteor/vulcan:core';
import { Loader, Container, Divider } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import React from 'react';

const ActivityRecordsSingleWrapped = (props, context) => {
  const record = props.document;
  if(props.loading) return <Loader />;
  if(!record) return (
    <div>
      Error, no document.
    </div>
  );

  return (
    <Container>
      <Divider hidden />

      User: {record.user?record.user.username:'-- none --'}<br />
      Activity: {record.activity}<br />
      <Divider hidden />

      <Components.EditModal document={props.document}
        component={Components.ElectricityActivityRecordEditForm} collection={ActivityRecords}
        title={'Debug Edit Test'}
        showDelete={true} deleteTitle={'Are You Really Sure??'} deleteQuestion={'Decide now or forever hold your peace.'}
        buttonAttrs={{content: 'Edit', icon: 'pencil', color: 'blue', size: 'huge', basic: false, compact: false, }} />
    </Container>
  );
};
const documentOptions = {
  collection: ActivityRecords,
  queryName: 'activityRecordsList',
  fragmentName: 'AcivityRecordsList',
}
registerComponent('ActivityRecordsSingleWrapped', ActivityRecordsSingleWrapped, [withDocument, documentOptions]);

const ActivityRecordsSingle = (props, context) => {
  return <Components.ActivityRecordsSingleWrapped documentId={props.params._id} />
};
registerComponent('ActivityRecordsSingle', ActivityRecordsSingle);
