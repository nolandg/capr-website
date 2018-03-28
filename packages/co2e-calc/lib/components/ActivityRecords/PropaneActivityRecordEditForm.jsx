import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';
import { getMidpointMoment } from '../../modules/utils.js';

class PropaneActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'propane');
    _.set(this.state, 'values.data.units', '');
  }

  render(){
    const { FormField, DateRangeField, SelectField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const units = ActivityRecords.Utils.getUnitsForContext('propane');
    const { inventory } = this.props;
    const initialMonth = inventory?getMidpointMoment(inventory.startDate, inventory.endDate):null;

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <DateRangeField label="For what period is this information for?" startName="startDate" endName="endDate" initialMonth={initialMonth} {...fieldProps} />

        <Form.Group widths="equal">
          <FormField label="How much propane did you buy?" name="data.amount" {...fieldProps} />
          <SelectField label="Units" name="data.units" placeholder='Units' options={units} {...fieldProps} />
        </Form.Group>
      </Form>
    )
  }
}

registerComponent('PropaneActivityRecordEditForm', PropaneActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'ActivityRecord'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'ActivityRecord'}],
  withCurrentUser
);
