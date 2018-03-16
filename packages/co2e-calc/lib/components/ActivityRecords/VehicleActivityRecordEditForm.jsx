import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Icon, Divider } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';

/*************************************************************************************************/
/* VehicleActivityRecordEditForm
/*************************************************************************************************/
class VehicleActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data', 'label'];
    super(props, fields);

    _.set(this.state, 'values.activity', 'vehicle');
    _.set(this.state, 'values.data.valueType', '');
    _.set(this.state, 'values.data.units', '');
    _.set(this.state, 'values.data.unitsType', 'gasoline');
  }

  render(){
    const { errors, values } = this.state;
    const { data } = values;
    const fuelTypes = ActivityRecords.Utils.getFuelTypes();
    const units = ActivityRecords.Utils.getUnitsForContext('vehicle.' + values.data.type);
    const efficiencyUnits = ActivityRecords.Utils.getUnitsForContext('vehicle.efficiency');
    const { FormField, CheckboxField, SelectField, DateRangeField } = Components;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const vehicleTypes = ActivityRecords.Utils.getVehicleTypeOptions();

    let dataHeader = 'Information';
    if(data.type === 'fuel-volume') dataHeader = 'Fuel Consumed';
    if(data.type === 'distance') dataHeader = 'Distance Driven';
    if(data.type === 'electric') dataHeader = 'You\'re Done!';

    return (
      <Form error={!!errors.count}>
        {this.renderMessages()}

        <Header as="h2">
          <Icon name="car" />
          <Header.Content>About Your Vehicle</Header.Content>
        </Header>

        <FormField label="Name of vehicle" name="label" {...fieldProps}
          description="Give this vehicle a name so you can keep track of what you\'ve entered. eg: Red Car or My Wife\'s Tesla"
        />

        <SelectField label="What kind of fuel does this vehicle burn?" name="data.fuelType" placeholder='Fuel type'
          options={fuelTypes} widthEm={21} {...fieldProps}/>

        <Divider hidden />
        <Header as="h2">
          <Icon name="info circle" />
          <Header.Content>What Kind of Information Do You Have?</Header.Content>
        </Header>

        <CheckboxField type="radio" toggle label="I know the liters of fuel I've burned (preferred method)" name='data.type' value='fuel-volume'
          {...fieldProps} />
        <CheckboxField type="radio" toggle label="I know how many kilometers I've driven" name='data.type' value='distance'
          {...fieldProps} />
        <CheckboxField type="radio" toggle label="This is an electric vehicle" name='data.type' value='electric'
          {...fieldProps} />

        <Divider hidden />
        <Header as="h2">
          <Icon name="calendar" />
          <Header.Content>For What Period is this Information For?</Header.Content>
        </Header>
        <DateRangeField label="" startName="startDate" endName="endDate" {...fieldProps} />

        {data.type ?
          <Divider hidden />
          :null}
        {data.type ?
          <Header as="h2">
            {data.type === 'fuel-volume'?<Icon className="gasoline" />:null}
            {data.type === 'distance'?<Icon className="distance" />:null}
            {data.type === 'electric'?<Icon name="check" />:null}
            <Header.Content>{dataHeader}</Header.Content>
          </Header>
        :null}

        {data.type === 'distance' || data.type === 'fuel-volume'?
          <Form.Group widths="equal">
            {data.type === 'fuel-volume'?
              <FormField label="How much fuel?" name="data.fuelVolume" {...fieldProps} /> :null}
            {data.type === 'distance'?
              <FormField label="How far did you drive?" name="data.distance" {...fieldProps} /> :null}
            <SelectField label="Units" name="data.units" placeholder='Units' options={units} {...fieldProps} />
          </Form.Group>
        :null}
        {data.type === 'distance'?
          <CheckboxField type="radio" toggle label="I know my fuel efficiency (yay!)"
            name="data.knownEfficiency" value="true" {...fieldProps} />
        :null}
        {data.type === 'distance'?
          <CheckboxField type="radio" toggle label="I want to estimate my fuel efficiency based on my type of vehicle"
            name="data.knownEfficiency" value="false" {...fieldProps} />
        :null}
        {data.type === 'distance' ?
          data.knownEfficiency === 'true' ?
            <Form.Group widths="equal">
              <FormField label="Fuel efficiency" name="data.efficiency" widthEm={21} {...fieldProps} />
              <SelectField label="Units" name="data.efficiencyUnits" placeholder='Units'
                options={efficiencyUnits} widthEm={21} {...fieldProps}/>
            </Form.Group>
          : data.knownEfficiency === 'false' ?
            <SelectField label="Vehicle type" name="data.vehicleType" placeholder='Vehicle Type'
              options={vehicleTypes} widthEm={21} {...fieldProps}/>
        :null:null}

        {data.type === 'electric'?
          <p>
            You drive an electric! Hurray! You don't need to enter anything else.
            <br/><br />
            Your (very small) equivalent CO<sub>2</sub>e emissions from driving are already
            accounted for by your electricity bills which you should enter.
          </p>:null}
      </Form>
    )
  }
}

registerComponent('VehicleActivityRecordEditForm', VehicleActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
