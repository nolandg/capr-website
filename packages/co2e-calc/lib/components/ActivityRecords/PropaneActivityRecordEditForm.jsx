import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';

class PropaneActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'propane');
    _.set(this.state, 'values.data.units', 'GJ');
  }

  render(){
    const { FormField, DateRangeField, SelectField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const units = ActivityRecords.Utils.getUnitsForContext('propane');

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <DateRangeField label="For what period is this information for?" startName="startDate" endName="endDate" {...fieldProps} />

        <Form.Group widths="equal">
          <FormField label="How much propane did you buy?" name="data.amount" {...fieldProps} /> :null}
          <SelectField label="Units" name="data.units" placeholder='Units' options={units} {...fieldProps} />
        </Form.Group>
      </Form>
    )
  }
}

registerComponent('PropaneActivityRecordEditForm', PropaneActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
