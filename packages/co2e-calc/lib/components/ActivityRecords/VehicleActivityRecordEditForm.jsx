import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Select, Checkbox } from 'semantic-ui-react'
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import moment from 'moment';

/*************************************************************************************************/
/*
/*************************************************************************************************/
class VehicleActivityRecordEditForm extends EditForm {
  constructor(props) {
    const fields = ['activity', 'startDate', 'endDate', 'data', 'group'];
    super(props, fields);

    this.state.values = {...this.state.values,
      activity: 'vehicle',
    };
  }

  handleDataChange = (key, value) => {
    this.setState({ values: { ...this.state.values, data: { ...this.state.values.data, [key]: value,} }});
  }

  handleGroupChange = (key, value) => {
    const group = { ...this.state.values.group, [key]: value};
    group.name = Date().valueOf();

    this.setState({ values: { ...this.state.values, group }});
  }

  render(){
    const {startDate, endDate, data, group } = this.state.values;
    const fuelVolumeUnits = ActivityRecords.Utils.getUnitsForContext('vehicle.fuel-volume');
    const distance = ActivityRecords.Utils.getUnitsForContext('vehicle.distance');

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <Form.Input label="Name of vehicle" name="group.label" value={group.label} width={7} onChange={this.handleChange} />
        <p>Give this vehicle a name so you can keep track of what you've entered. Example: "Red car" or "My Wife's Tesla"</p>

        <Form.Field>
          <Checkbox type="radio" toggle label="I know the liters of fuel I've burned (preffered!)" name='data.valueType' value='fuel-volume'
            checked={data.valueType === 'fuel-volume'} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Checkbox type="radio" toggle label="I know the kilometers I've driven" name='data.valueType' value='distance'
            checked={data.valueType === 'distance'} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field>
          <label>For what period is this information for?</label>
          <Components.DateRangePicker startDate={startDate} endDate={endDate} handleChange={this.handleChange} />
        </Form.Field>
        <Form.Group>
          <Form.Input label="How many liters of fuel?" name="data.value" value={data.value} onChange={this.handleChange} width={7} />
          <Form.Field label='Units' name="data.units" value={data.units} placeholder='Units'
            control={Select} options={fuelVolumeUnits} width={3}
            onChange={this.handleChange} />

        </Form.Group>
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

/*************************************************************************************************/
/*
/*************************************************************************************************/
class VehiclesActivityRecordEditForm extends Component {
  renderRecord = (record) => {
    return (
      <div key={record._id}>
        Start date: {moment(record.startDate).format('MMM DD, YYYY')}
      </div>
    );
  }

  renderVehicleGroup = (vehicle) => {
    return (
      <div key={vehicle.name}>
        <Header as="h4">{vehicle.label}</Header>
        <p>Milage: {vehicle.milage} {vehicle.milageUnits}</p>
        {vehicle.records.map(record => this.renderRecord(record))}
      </div>
    );
  }

  groupByVehicle = (records) => {
    records = this.props.activityRecords.filter(record => record.activity === 'vehicle');
    const groupedRecords = {};

    records.forEach(record => {
      const vehicle = record.group;
      if(!vehicle) return;

      if(!groupedRecords[vehicle.name]) groupedRecords[vehicle.name] = {
        milage: vehicle.data.milage,
        milageUnits: vehicle.data.milageUnits,
        label: vehicle.label,
        name: vehicle.name,
        records: [],
      }
      groupedRecords[vehicle.name].records.push(record);
    });

    return groupedRecords;
  }

  render(){
    const groupedRecords = this.groupByVehicle(this.props.activityRecords);

    const helpItems = [
    ];

    return (
      <div>
        <Components.EditModal component={Components.VehicleActivityRecordEditForm} collection={ActivityRecords}
          title="Add a new vehicle"
          showDelete={false}
          buttonAttrs={{content: 'Add a vehicle', icon: 'plus', color: 'blue' }} />

        <div>
          {Object.keys(groupedRecords).map(vehicleName => this.renderVehicleGroup(groupedRecords[vehicleName]))}
        </div>

        <Components.HelpAccordion items={helpItems} title="Help" subtitle="How to find this information on your bill" />
      </div>
    )
  }
}

registerComponent('VehiclesActivityRecordEditForm', VehiclesActivityRecordEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'AcivityRecordsList'}],
  withCurrentUser
);
