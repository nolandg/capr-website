import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Accordion } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords';
import moment from 'moment';

class InventoryElectricity extends Component {
  render(){

    return (
      <div>
        <ActivityRecordsAccordion activityRecords={this.props.activityRecords} />

        <Components.EditModal component={Components.ElectricityActivityRecordEditForm} collection={ActivityRecords}
          title="Add a BC Hydro bill"
          buttonAttrs={{content: 'Add another BC Hydro bill', icon: 'plus', color: 'green'}} />
      </div>
    )
  }
}

/*********************************************************************************************************/
/* ActivityRecordsAccordion
/*********************************************************************************************************/
class ActivityRecordsAccordion extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    this.setState({ activeIndex: this.state.activeIndex === titleProps.index ? -1 : titleProps.index })
  }

  renderRecordRow = (record) => {
    return (
      <Table.Row key={record._id}>
        <Table.Cell>
          {moment(record.startDate).format('MMM DD')} to {moment(record.endDate).format('MMM DD, YYYY')}
        </Table.Cell>
        <Table.Cell>
          {record.emissionData?record.emissionData.value:'???'}
        </Table.Cell>
        <Table.Cell>
          <Components.EditModal document={record} component={Components.ElectricityActivityRecordEditForm} collection={ActivityRecords}
            title="Edit BC Hydro bill"
            showDelete={true} deleteHeader="Confirm Delete Bill" deleteQuestion="Are you sure you want to delete this bill?"
            buttonAttrs={{content: 'Edit', icon: 'pencil', color: 'blue'}} />
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { activeIndex } = this.state;
    let { activityRecords } = this.props;

    activityRecords = activityRecords.filter((r) => {return r.activity === 'electricity'});

    return (
      <Accordion styled={activeIndex !== -1}>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          BC Hydro Bills you've already entered
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><Icon name="calendar" />Dates</Table.HeaderCell>
                <Table.HeaderCell><Icon name="dashboard" />Kilowatt Hours</Table.HeaderCell>
                <Table.HeaderCell><Icon name="pencil" />Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {activityRecords.map(this.renderRecordRow)}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    )
  }
}

registerComponent('InventoryElectricity', InventoryElectricity);
