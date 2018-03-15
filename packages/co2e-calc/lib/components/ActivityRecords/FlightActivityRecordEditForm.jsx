import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';
import utils from '../../modules/utils.js';

class FlightActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'flight');
    _.set(this.state, 'values.data.units', 'km');
  }

  render(){
    const { DateRangeField, LocationField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <DateRangeField label="For what period is this bill for?" startName="startDate" endName="endDate" {...fieldProps} />

        <LocationField label="From" name="data.flightOrigin" width={4} {...fieldProps} />
        <LocationField label="To" name="data.flightDestination" width={4} {...fieldProps} />
      </Form>
    )
  }
}

registerComponent('FlightActivityRecordEditForm', FlightActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
