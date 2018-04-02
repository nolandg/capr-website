import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader, Table, Dimmer, Icon, Header, Container, Divider } from 'semantic-ui-react';
import { Inventories } from '../../modules/Inventories';
import { Link } from 'react-router';
import moment from 'moment';
import _ from 'lodash';

class InventoriesList extends Component {

  render(){
    const terms = {view: 'inventoriesList' }

    return (
      <div className="inventories-dashboard">
        <Header as="h2" textAlign="center"><Icon name="table" />Footprints List</Header>
        <Components.InventoriesListInner terms={terms} />
      </div>
    );
  }
}
registerComponent('InventoriesList', InventoriesList);

class InventoriesListInner extends Component {

  renderRow = (inventory) => {
    const recordsCount = _.get(inventory, 'chartData.timelineData.activitySeriesNames', []).length;
    const totalKg = Math.round(_.get(inventory, 'chartData.totals.total', 0));

    return (
      <Table.Row key={inventory._id}>
        {this.canViewUser?<Table.Cell>{inventory.user.username}</Table.Cell>:null}
        <Table.Cell>{moment(inventory.startDate).year()}</Table.Cell>
        <Table.Cell>{inventory.postalCode}</Table.Cell>
        <Table.Cell>{inventory.homeArea} {inventory.homeAreaUnits}</Table.Cell>
        <Table.Cell>{inventory.homeOccupantCount}</Table.Cell>
        <Table.Cell>{recordsCount}</Table.Cell>
        <Table.Cell>{totalKg} kg</Table.Cell>
        <Table.Cell><Link to={`/inventories/${inventory._id}`}>view</Link></Table.Cell>
      </Table.Row>
    );
  }

  renderHeader = () => {
    return (
      <Table.Header><Table.Row>
        {this.canViewUser?<Table.HeaderCell><Icon name="user" />User</Table.HeaderCell>:null}
        <Table.HeaderCell><Icon name="calendar" />Year</Table.HeaderCell>
        <Table.HeaderCell><Icon name="marker" />Postal Code</Table.HeaderCell>
        <Table.HeaderCell><Icon name="maximize" />Home Area</Table.HeaderCell>
        <Table.HeaderCell><Icon name="users" />Home Occupants</Table.HeaderCell>
        <Table.HeaderCell><Icon name="copy" /># of Records</Table.HeaderCell>
        <Table.HeaderCell><Icon name="cloud" />Total CO2<sub>e</sub></Table.HeaderCell>
        <Table.HeaderCell><Icon name="search" />View</Table.HeaderCell>
      </Table.Row></Table.Header>
    );
  }

  render(){
    if(this.props.loading || this.props.currentUserLoading) return (
      <Dimmer active style={{height: '100vh'}}>
        <Loader content="Loading..." size="massive"/>
      </Dimmer>
    );

    const { results } = this.props;
    if(!results.length) return (
      <Container><Divider hidden />No footprints :-(</Container>
    );
    const viewableFields = Users.restrictViewableFields(this.props.currentUser, Inventories, results[0]);
    this.canViewUser = viewableFields.userId !== undefined;

    return (
      <Table>
        {this.renderHeader()}
        <Table.Body>
          {results.map(this.renderRow)}
        </Table.Body>
      </Table>
    );
  }
}

const listOptions = {
  collection: Inventories,
  queryName: 'Inventory',
  fragmentName: 'Inventory',
};
registerComponent('InventoriesListInner', InventoriesListInner, withCurrentUser, [withList, listOptions]);
