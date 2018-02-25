import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';

class ActivityRecordsEditForm extends EditForm {
  constructor(props) {
    const defaultNewDocument = {
      activity: 'blah blah',
    }

    super(props, defaultNewDocument);
  }

  render(){
    return (
      <Form>
        <Form.Input label="Activity" name="activity" value={this.state.activity} onChange={this.handleChange} />
      </Form>
    )
  }
}

registerComponent('ActivityRecordsEditForm', ActivityRecordsEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
