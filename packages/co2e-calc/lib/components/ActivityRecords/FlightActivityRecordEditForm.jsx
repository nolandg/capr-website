import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Divider, Icon } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';
import { distanceBetweenLocationsInKm } from '../../modules/utils.js';

class FlightActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'flight');
    _.set(this.state, 'values.data.units', 'km');
  }

  handleDistanceChange = (event, element) => {
    this.handleChange(event, element);

    let origin = _.get(this.state, 'values.data.flightOrigin', {});
    let destination = _.get(this.state, 'values.data.flightDestination', {});

    if(element.name === 'data.flightOrigin') origin = element.value;
    if(element.name === 'data.flightDestination') destination = element.value;

    if(!origin.lat || !destination.lat) return;

    let distance = distanceBetweenLocationsInKm(origin, destination);

    if(element.name === 'data.isRoundTrip'){
      if(element.value === 'true') distance *= 2;
    }else if(this.state.values.data.isRoundTrip === 'true'){
      distance *= 2;
    }

    this.updateValue('data.distance', distance);
  }

  render(){
    const { DateRangeField, LocationField, CheckboxField } = Components;
    const { values, errors } = this.state;
    const { data } = values;
    const fieldProps = { values, errors, onChange: this.handleChange };


    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <DateRangeField label="When did you fly?" startName="startDate" endName="endDate" {...fieldProps}
          description="This can be very approximate, don't try to remember exact dates!"/>

        <CheckboxField type="radio" toggle label="This was a round-trip flight"
          name="data.isRoundTrip" value="true" onChange={this.handleDistanceChange} values={values} errors={errors}  />
        <CheckboxField type="radio" toggle label="This was a one-way flight"
          name="data.isRoundTrip" value="false" onChange={this.handleDistanceChange} values={values} errors={errors}  />

        <LocationField label="From" name="data.flightOrigin" width={4}
          onChange={this.handleDistanceChange} values={values} errors={errors} />
        <LocationField label="To" name="data.flightDestination" width={4}
          onChange={this.handleDistanceChange} values={values} errors={errors}  />

        <Divider hidden />
        <Header as="h3">
          <Icon className="distance" />
          <Header.Content>Distance: {data.distance} {data.distance?'km':''}</Header.Content>
        </Header>
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
