import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
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
        <Form.Input label="Activity" name="activity" value={activity} onChange={this.handleChange} error={!!this.state.errors.fields.activity}/>
        <Form.Field>
          <label>Dates</label>
          <DateRangePicker
            startDate={startDate?moment(startDate):null} // momentPropTypes.momentObj or null,
            startDateId="startDateId" // PropTypes.string.isRequired,
            endDate={endDate?moment(endDate):null} // momentPropTypes.momentObj or null,
            endDateId="endDateId" // PropTypes.string.isRequired,
            onDatesChange={(values) => this.handleChange(null, {type: 'airbnb-date-range-picker', names: ['startDate', 'endDate'], values})}
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            noBorder={true}
            showClearDates={true}
            transitionDuration={500}
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
