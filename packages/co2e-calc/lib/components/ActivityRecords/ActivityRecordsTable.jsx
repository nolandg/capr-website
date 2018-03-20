import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Accordion } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords';
import moment from 'moment';
import { Link } from 'react-router';
import _ from 'lodash';

/*******************************************************************************************************/
/* Vechicle
/*******************************************************************************************************/
class VehicleActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="label"><Icon name="car" />Vehicle</Table.HeaderCell>,
      <Table.HeaderCell key="data"><Icon name="dashboard" />Data</Table.HeaderCell>,
    ]);
  }

  renderActivitySpecificCells = (record) => {
    const data = record.data;
    let str = '';

    if(!data){
      str = '';
    }else{
      const fuel = ActivityRecords.Utils.fuelTypeValueToText(data.fuelType);

      if(data.type === 'electric'){
        str = 'Yay for electric vehicles!';
      }else if(data.type === 'fuel-volume'){
        str = `${data.fuelVolume} ${data.units} of ${fuel} burned`;
      }else if(data.type === 'distance'){
        if(data.knownEfficiency === 'true'){
          str = `${data.distance} ${data.units} at ${data.efficiency} ${data.efficiencyUnits} of ${fuel}`;
        }else{
          const vehicleType = ActivityRecords.Utils.vehicleTypeValueToEfficiencyString(data.vehicleType);
          str = `${data.distance} ${data.units} in a ${vehicleType} of ${fuel}`;
        }
      }
    }

    return ([
      <Table.Cell key="label">{record.label}</Table.Cell>,
      <Table.Cell key="data">{str}</Table.Cell>,
    ]);
  }

  render() {
    return (
      <ActivityRecordsTable
        {...this.props}
        filterActivity="vehicle"
        editTitle="Edit Vehicle Entry"
        editFormComponent={Components.VehicleActivityRecordEditForm}
        deleteTitle="Confirm Delete Vechicle Entry"
        deleteQuestion="Are you sure you want to delete this vehicle entry?"
        renderActivitySpecificCells={this.renderActivitySpecificCells}
        renderActivitySpecificHeaderCells={this.renderActivitySpecificHeaderCells}
      />
    );
  }
}
registerComponent('VehicleActivityRecordsTable', VehicleActivityRecordsTable);

/*******************************************************************************************************/
/* Electricity
/*******************************************************************************************************/
class ElectricityActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="energy"><Icon name="dashboard" />Kilowatt Hours</Table.HeaderCell>
    ]);
  }

  renderActivitySpecificCells = (record) => {
    return ([
      <Table.Cell key="energy">{record.data?record.data.energy:'?'}</Table.Cell>
    ]);
  }

  render() {
    return (
      <ActivityRecordsTable
        {...this.props}
        filterActivity="electricity"
        editTitle="Edit BC Hydro Bill"
        editFormComponent={Components.ElectricityActivityRecordEditForm}
        deleteTitle="Confirm Delete Bill"
        deleteQuestion="Are you sure you want to delete this bill?"
        renderActivitySpecificCells={this.renderActivitySpecificCells}
        renderActivitySpecificHeaderCells={this.renderActivitySpecificHeaderCells}
      />
    );
  }
}
registerComponent('ElectricityActivityRecordsTable', ElectricityActivityRecordsTable);

/*******************************************************************************************************/
/* Propane
/*******************************************************************************************************/
class PropaneActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="amount"><Icon name="dashboard" />Amount</Table.HeaderCell>
    ]);
  }

  renderActivitySpecificCells = (record) => {
    return ([
      <Table.Cell key="amount">{_.get(record, 'data.amount', '?')} {_.get(record, 'data.units', '?')}</Table.Cell>
    ]);
  }

  render() {
    return (
      <ActivityRecordsTable
        {...this.props}
        filterActivity="propane"
        editTitle="Edit Propane Consumption"
        editFormComponent={Components.PropaneActivityRecordEditForm}
        deleteTitle="Confirm Delete Propane Consumption"
        deleteQuestion="Are you sure you want to delete this propane information?"
        renderActivitySpecificCells={this.renderActivitySpecificCells}
        renderActivitySpecificHeaderCells={this.renderActivitySpecificHeaderCells}
      />
    );
  }
}
registerComponent('PropaneActivityRecordsTable', PropaneActivityRecordsTable);

/*******************************************************************************************************/
/* HeatingOil
/*******************************************************************************************************/
class HeatingOilActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="amount"><Icon name="dashboard" />Amount</Table.HeaderCell>
    ]);
  }

  renderActivitySpecificCells = (record) => {
    return ([
      <Table.Cell key="amount">{_.get(record, 'data.amount', '?')} {_.get(record, 'data.units', '?')}</Table.Cell>
    ]);
  }

  render() {
    return (
      <ActivityRecordsTable
        {...this.props}
        filterActivity="heating-oil"
        editTitle="Edit HeatingOil Consumption"
        editFormComponent={Components.HeatingOilActivityRecordEditForm}
        deleteTitle="Confirm Delete Heating Oil Consumption"
        deleteQuestion="Are you sure you want to delete this heating oil information?"
        renderActivitySpecificCells={this.renderActivitySpecificCells}
        renderActivitySpecificHeaderCells={this.renderActivitySpecificHeaderCells}
      />
    );
  }
}
registerComponent('HeatingOilActivityRecordsTable', HeatingOilActivityRecordsTable);

/*******************************************************************************************************/
/* Flight
/*******************************************************************************************************/
class FlightActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="origin"><Icon name="marker" />Origin</Table.HeaderCell>,
      <Table.HeaderCell key="destination"><Icon name="marker" />Destination</Table.HeaderCell>,
      <Table.HeaderCell key="distance"><Icon className="distance" />Distance (km)</Table.HeaderCell>,
    ]);
  }

  renderActivitySpecificCells = (record) => {
    const data = record.data;

    return ([
      <Table.Cell key="origin">{_.get(data, 'flightOrigin.text', '?')}</Table.Cell>,
      <Table.Cell key="destination">{_.get(data, 'flightDestination.text', '?')}</Table.Cell>,
      <Table.Cell key="distance">{_.get(data, 'distance', '?')}</Table.Cell>,
    ]);
  }

  render() {
    return (
      <ActivityRecordsTable
        {...this.props}
        filterActivity="flight"
        editTitle="Edit Flight"
        editFormComponent={Components.FlightActivityRecordEditForm}
        deleteTitle="Confirm Delete Flight"
        deleteQuestion="Are you sure you want to delete this flight?"
        renderActivitySpecificCells={this.renderActivitySpecificCells}
        renderActivitySpecificHeaderCells={this.renderActivitySpecificHeaderCells}
      />
    );
  }
}
registerComponent('FlightActivityRecordsTable', FlightActivityRecordsTable);

/*******************************************************************************************************/
/* Natural Gas
/*******************************************************************************************************/
class NaturalGasActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="gj"><Icon name="dashboard" />Gigajoules</Table.HeaderCell>
    ]);
  }

  renderActivitySpecificCells = (record) => {
    return ([
      <Table.Cell key="energy">{record.data?record.data.energy:'?'}</Table.Cell>
    ]);
  }

  render() {
    return (
      <ActivityRecordsTable
        {...this.props}
        filterActivity="natural-gas"
        editTitle="Edit Fortis BC Bill"
        editFormComponent={Components.NaturalGasActivityRecordEditForm}
        deleteTitle="Confirm Delete Bill"
        deleteQuestion="Are you sure you want to delete this bill?"
        renderActivitySpecificCells={this.renderActivitySpecificCells}
        renderActivitySpecificHeaderCells={this.renderActivitySpecificHeaderCells}
      />
    );
  }
}
registerComponent('NaturalGasActivityRecordsTable', NaturalGasActivityRecordsTable);

/*******************************************************************************************************/
/* Base/Generic Activity
/*******************************************************************************************************/
class ActivityRecordsTable extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    this.setState({ activeIndex: this.state.activeIndex === titleProps.index ? -1 : titleProps.index })
  }

  renderRecordRow = (record) => {
    const { renderActivitySpecificCells, editFormComponent, showActivityColumn, deleteTitle, deleteQuestion, editTitle } = this.props;

    return (
      <Table.Row key={record._id}>
        {showActivityColumn?
          <Table.Cell>{ActivityRecords.Utils.activityValueToText(record.activity)}</Table.Cell>
          :null}
        {showActivityColumn?
          <Table.Cell>{record.user.username}</Table.Cell>
          :null}
        <Table.Cell>
          {moment(record.startDate).format('MMM DD')} to {moment(record.endDate).format('MMM DD, YYYY')}
          &nbsp;({record.dayCount} days)
        </Table.Cell>
        {renderActivitySpecificCells?renderActivitySpecificCells(record):null}
        <Table.Cell>
          {record.co2e?(record.co2e).toFixed(0):'?'}
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Components.EditModal document={record} component={editFormComponent} collection={ActivityRecords}
            title={editTitle}
            showDelete={true} deleteTitle={deleteTitle} deleteQuestion={deleteQuestion}
            buttonAttrs={{content: 'Edit', icon: 'pencil', color: 'blue', size: 'mini', basic: true, compact: true, }} />
        </Table.Cell>
        {/* <Table.Cell>
          <Link to={'/activity-records/' + record._id}>Debug</Link>
        </Table.Cell> */}
      </Table.Row>
    );
  }

  renderTable = () => {
    let { records, filterActivity, renderActivitySpecificHeaderCells, showActivityColumn, showUserColumn } = this.props;

    if(filterActivity){
      records = records.filter((r) => {return r.activity === filterActivity});
    }

    return (
      <Table celled className="activity-records-table">
        <Table.Header>
          <Table.Row>
            {showActivityColumn?
              <Table.HeaderCell><Icon name="bath" />Activity</Table.HeaderCell>
              :null}
            {showUserColumn?
              <Table.HeaderCell><Icon name="user" />User</Table.HeaderCell>
              :null}
            <Table.HeaderCell><Icon name="calendar" />Dates</Table.HeaderCell>
            {renderActivitySpecificHeaderCells?renderActivitySpecificHeaderCells():null}
            <Table.HeaderCell><Icon name="cloud" />Emissions (kg)</Table.HeaderCell>
            <Table.HeaderCell textAlign="center"><Icon name="pencil" />Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {records.map(this.renderRecordRow)}
        </Table.Body>
      </Table>
    );
  }

  renderAccordion = () => {
    const { activeIndex } = this.state;

    return (
      <Accordion styled={activeIndex !== -1}>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Title Here
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {this.renderTable()}
        </Accordion.Content>
      </Accordion>
    );
  }

  render() {
    if(this.props.asAccordion) return this.renderAccordion();
    else return this.renderTable();
  }
}
registerComponent('ActivityRecordsTable', ActivityRecordsTable);
