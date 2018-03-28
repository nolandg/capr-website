import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  { EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';
import moment from 'moment';
import { getMidpointMoment } from '../../modules/utils.js';

class ElectricityActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'electricity');
    _.set(this.state, 'values.data.units', 'kWh');
  }

  render(){
    const { FormField, DateRangeField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const { inventory } = this.props;
    const initialMonth = inventory?getMidpointMoment(inventory.startDate, inventory.endDate):moment();

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

        <DateRangeField label="For what period is this bill for?" startName="startDate" endName="endDate" initialMonth={initialMonth} {...fieldProps} />

        <FormField label="How many kilowatt-hours are on this bill?" name="data.energy" widthEm={9} {...fieldProps} />

        <Components.HelpAccordion items={helpItems} title="Help" subtitle="How to find this information on your bill" />
      </Form>
    )
  }
}

registerComponent('ElectricityActivityRecordEditForm', ElectricityActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'ActivityRecord'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'ActivityRecord'}],
  withCurrentUser
);
