import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Image, Segment, Header } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';

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

    const helpItems = [
      {
        title: 'How do I find kilowatt hours on my bill?',
        content:
          <div>
            See the image below.<br/><br />
            On the right-hand side of your bill in the "Meter Reading Information" section,
            the total kilowatt hours for this bill are shown below the meter readings for each date.
            In this example, the kilowatt hours is 5448.
          </div>,
        image: '/packages/co2e-calc/lib/assets/images/bc-hydro-bill-kwh.png',
      },
      {
        title: 'How do I find the dates on my bill?',
        content:
          <div>
            See the image below.<br/><br />
            On the right-hand side of your bill in the "Meter Reading Information" section,
            the start and end date for this billing period are shown.
            In this example, the dates are Dec 6 to Feb 5.<br /><br />
          </div>,
        image: '/packages/co2e-calc/lib/assets/images/bc-hydro-bill-dates.png',
      }
    ];

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <Form.Field>
          <label>For what period is this bill for?</label>
          <Components.DateRangePicker startDate={startDate} endDate={endDate} handleChange={this.handleChange} />
        </Form.Field>


        <Form.Input label="How many kilowatt-hours are on this bill?" width={6}
          onChange={this.handleKwhChange} value={kwh}/>

        <Components.HelpAccordion items={helpItems} title="Help" subtitle="How to find this information on your bill" />
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
