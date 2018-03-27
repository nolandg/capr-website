import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';

class HeatingOilActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'heating-oil');
    _.set(this.state, 'values.data.units', '');
  }

  render(){
    const { FormField, DateRangeField, SelectField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const units = ActivityRecords.Utils.getUnitsForContext('heating-oil');

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <DateRangeField label="For what period is this information for?" startName="startDate" endName="endDate" {...fieldProps} />

        <Form.Group widths="equal">
          <FormField label="How much oil did you buy?" name="data.amount" {...fieldProps} />
          <SelectField label="Units" name="data.units" placeholder='Units' options={units} {...fieldProps} />
        </Form.Group>
      </Form>
    )
  }
}

registerComponent('HeatingOilActivityRecordEditForm', HeatingOilActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'ActivityRecord'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'ActivityRecord'}],
  withCurrentUser
);
