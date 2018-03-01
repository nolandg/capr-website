import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class ElectricityActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'emissionData'];
    super(props, fields);

    this.state.values = {...this.state.values,
      activity: 'electricity',
    };
  }

  handleKwhChange = (e, { value }) => {
    this.setState({ values: { ...this.state.values, emissionData: {
      value: value,
      units: 'kWh',
    } }});
  }

  render(){
    const {startDate, endDate} = this.state.values;
    const kwh = this.state.values.emissionData?this.state.values.emissionData.value:0;

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <Form.Field>
          <label>For what period is this bill for?</label>
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
            isOutsideRange={() => false}
          />
        </Form.Field>


        <Form.Input label="How many kilowatt-hours are on this bill?" width={6}
          onChange={this.handleKwhChange} value={kwh}/>
      </Form>
    )
  }
}

registerComponent('ElectricityActivityRecordEditForm', ElectricityActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
