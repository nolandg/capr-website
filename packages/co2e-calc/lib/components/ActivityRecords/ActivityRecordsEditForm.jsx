import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';

class ActivityRecordsEditForm extends EditForm {
  constructor(props) {
    const defaultNewDocument = {
      activity: 'blah blah',
      startDate: moment(),
      endDate: moment(),
    }

    super(props, defaultNewDocument);
  }

  render(){
    const {activity, start} = this.state;

    return (
      <Form>
        <Form.Input label="Activity" name="activity" value={activity} onChange={this.handleChange} />
        <Form.Field>
          <label>Dates</label>
          <DateRangePicker
            startDate={moment(this.state.startDate)} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={moment(this.state.endDate)} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            noBorder={true}
          />
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
