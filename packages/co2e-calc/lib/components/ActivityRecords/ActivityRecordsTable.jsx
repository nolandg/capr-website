import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Accordion } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords';
import moment from 'moment';

/*******************************************************************************************************/
/* Electricity
/*******************************************************************************************************/
class ElectricityActivityRecordsTable extends Component {
  renderActivitySpecificHeaderCells = () => {
    return ([
      <Table.HeaderCell key="kWh"><Icon name="dashboard" />Kilowatt Hours</Table.HeaderCell>
    ]);
  }

  renderActivitySpecificCells = (record) => {
    return ([
      <Table.Cell key="kWh">{record.emissionData?record.emissionData.value:'???'}</Table.Cell>
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
          <Table.Cell>{ActivityRecords.activityValueToText(record.activity)}</Table.Cell>
          :null
        }
        <Table.Cell>
          {moment(record.startDate).format('MMM DD')} to {moment(record.endDate).format('MMM DD, YYYY')}
        </Table.Cell>
        {renderActivitySpecificCells?renderActivitySpecificCells(record):null}
        <Table.Cell>
          <Components.EditModal document={record} component={editFormComponent} collection={ActivityRecords}
            title={editTitle}
            showDelete={true} deleteHeader={deleteTitle} deleteQuestion={deleteQuestion}
            buttonAttrs={{content: 'Edit', icon: 'pencil', color: 'blue', size: 'mini', basic: true, compact: true, }} />
        </Table.Cell>
      </Table.Row>
    );
  }

  renderTable = () => {
    let { records, filterActivity, renderActivitySpecificHeaderCells, showActivityColumn } = this.props;

    if(filterActivity){
      records = records.filter((r) => {return r.activity === filterActivity});
    }

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {showActivityColumn?
              <Table.HeaderCell><Icon name="bath" />Activity</Table.HeaderCell>
              :null
            }
            <Table.HeaderCell><Icon name="calendar" />Dates</Table.HeaderCell>
            {renderActivitySpecificHeaderCells?renderActivitySpecificHeaderCells():null}
            <Table.HeaderCell><Icon name="pencil" />Edit</Table.HeaderCell>
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
          BC Hydro Bills you've already entered
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
