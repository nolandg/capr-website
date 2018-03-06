import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class ActivityRecordsEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate'];
    super(props, fields);
  }

  render(){
    const {activity, startDate, endDate} = this.state.values;

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}
        <Form.Field control={Select} label='Activity' name="activity" value={activity} options={ActivityRecords.Utils.getAllowedActivities()}
          placeholder='Activity' onChange={this.handleChange} error={!!this.state.errors.fields.activity} />

        <Form.Field>
          <label>Dates</label>
          <Components.DateRangePicker startDate={startDate} endDate={endDate} handleChange={this.handleChange} />
        </Form.Field>
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
