import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer, Button, Header, Container, Divider } from 'semantic-ui-react';
import { Inventories } from '../../modules/Inventories';
// import { Link } from 'react-router';
import moment from 'moment';
// import _ from 'lodash';

// const ActivityRecords = getCollection('ActivityRecords');

class InventoriesResults extends Component {
  state = {
    year: moment().year(),
  }

  render(){
    const terms = {
      view: 'inventoriesList',
      startDate: moment().year(this.state.year).startOf('year'),
      endDate: moment().year(this.state.year).endOf('year'),
    };

    return (
      <div>
        <Header as="h4">Select Year:</Header>
        {[2014, 2015, 2016, 2017, 2018].map(year =>
          <Button key={year} basic={this.state.year !== year} onClick={() => this.setState({year})}>{year}</Button>
        )}
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Components.InventoriesResultsInner terms={terms} />
      </div>
    );
  }
}
registerComponent('InventoriesResults', InventoriesResults);

class InventoriesResultsInner extends Component {

  massageData = (inventories) => {
    const activityTotals = {};
    const activityPercents = {};
    const data = [];
    let seriesNames = [];
    let total = 0;

    inventories.forEach((inventory) => {
      console.log(inventory);
      if(!inventory.chartData || !inventory.chartData.totals) return;
      const totals = inventory.chartData.totals.activityTotals;
      for(const activity in totals){
        if(activityTotals[activity] === undefined) activityTotals[activity] = 0;
        activityTotals[activity] += totals[activity];
        total += totals[activity];
      }
    });

    for(const activity in activityTotals){
      activityPercents[activity] = activityTotals[activity] / total * 100;
      data.push({name: activity, value: activityTotals[activity], percent: activityPercents[activity]});
    }

    return {activityTotals, activityPercents, data, seriesNames, total}
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

    const data = this.massageData(results);
    const aggregatedInventory = {
      startDate: moment(),
      endDate: moment(),
      chartData: {totals: data},
    }

    return (
      <div>
        <Header as="h2" textAlign="center">
          Emissions By Category
          <Header.Subheader>Hover for details</Header.Subheader>
        </Header>
        <Components.InventoryPieChart inventory={aggregatedInventory} />
      </div>
    );
  }
}

const listOptions = {
  collection: Inventories,
  queryName: 'Inventory',
  fragmentName: 'Inventory',
  limit: 100,
};
registerComponent('InventoriesResultsInner', InventoriesResultsInner, withCurrentUser, [withList, listOptions]);
