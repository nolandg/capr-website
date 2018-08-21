import { Components, registerComponent, withCurrentUser, withList, getCollection } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader, Icon, Statistic, Dimmer, Header, Grid, Divider } from 'semantic-ui-react';
import _ from 'lodash';

const Inventories = getCollection('Inventories');

class InventoriesDashboard extends Component {

  render(){
    if(this.props.loading) return (
      <Dimmer active style={{height: '100vh'}}>
        <Loader content="Loading..." size="massive"/>
      </Dimmer>
    );

    const { results } = this.props;
    const footprintCount = results.length;
    let totalCo2Measured = results.reduce((acc, inventory) => {
      return acc + _.get(inventory, 'chartData.totals.total', 0);
    }, 0);
    totalCo2Measured = Math.round(totalCo2Measured/1000);
    const userCount = results.reduce((acc, inventory) => {
      return _.union(acc, [inventory.userId]);
    }, []).length;

    return (
      <div className="inventories-dashboard">
        <Header as="h2" textAlign="center"><Icon name="dashboard" />Footprints Dashboard</Header>

        <Divider hidden />
        <Divider hidden />
        <Grid columns={3} divided textAlign="center">
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="cloud" /> {totalCo2Measured}</Statistic.Value>
              <Statistic.Label>total tons measured</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="cloud" /> {footprintCount}</Statistic.Value>
              <Statistic.Label>total footprints measured</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="users" /> {userCount}</Statistic.Value>
              <Statistic.Label>people submitted footprints</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const listOptions = {
  collection: Inventories,
  queryName: 'Inventory',
  fragmentName: 'Inventory',
  limit: 500,
};
registerComponent('InventoriesDashboard', InventoriesDashboard, withCurrentUser, [withList, listOptions]);
