import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
// import moment from 'moment';

class InventoryResults extends Component {
  render(){
    const { inventory } = this.props;
    // const year = moment(inventory.startDate).year();

    return (
      <div className="inventory-results">
        <Components.InventoryStats inventory={inventory} />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Header as="h1" textAlign="center">
          Emissions By Category
          <Header.Subheader>Hover for details</Header.Subheader>
        </Header>
        <Components.InventoryPieChart inventory={inventory} />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Header as="h1" textAlign="center">
          Emissions Timeline
          <Header.Subheader>Hover for details</Header.Subheader>
        </Header>
        <Components.EmissionsTimeline inventory={inventory} width="100%" height={500} />
      </div>
    )
  }
}

registerComponent('InventoryResults', InventoryResults);
