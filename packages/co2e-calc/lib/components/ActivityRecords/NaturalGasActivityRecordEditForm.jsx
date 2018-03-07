import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';

class NaturalGasActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    this.state.values = {...this.state.values,
      activity: 'natural-gas',
    };
  }

  handleGJChange = (e, { value }) => {
    this.setState({ values: { ...this.state.values, data: {
      value: value,
      units: 'GJ',
    } }});
  }

  render(){
    const {startDate, endDate} = this.state.values;
    const gj = this.state.values.data?this.state.values.data.value:0;

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


        <Form.Input label="How many gigajoules are on this bill?" width={7}
          onChange={this.handleGJChange} value={gj}/>

        <Components.HelpAccordion items={helpItems} title="Help" subtitle="How to find this information on your bill" />
      </Form>
    )
  }
}

registerComponent('NaturalGasActivityRecordEditForm', NaturalGasActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
