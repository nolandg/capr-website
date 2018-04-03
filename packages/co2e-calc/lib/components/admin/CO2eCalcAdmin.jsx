import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment} from 'semantic-ui-react';
import { Utils } from 'meteor/vulcan:lib';

class CO2eCalcAdmin extends PureComponent {
  state = { activeItem: 'dashboard' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderDashboard = () => {
    return (
      <div>
        <Components.InventoriesDashboard />
      </div>
    )
  }

  renderInventoriesList = () => {
    return (
      <div>
        <Components.InventoriesList />
      </div>
    )
  }

  renderInventoriesResults = () => {
    return (
      <div>
        <Components.InventoriesResults />
      </div>
    )
  }

  render(){
    const { activeItem } = this.state;

    return (
      <div>
        <Menu attached='top' tabular size="huge">
          <Menu.Item content="Dashboard" icon="dashboard" name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
          <Menu.Item content="Footprints" icon={{className: 'footprint'}} name='inventories-list' active={activeItem === 'inventories-list'} onClick={this.handleItemClick} />
          <Menu.Item content="Data" icon="pie chart" name='inventories-results' active={activeItem === 'inventories-results'} onClick={this.handleItemClick} />
        </Menu>

        <Segment attached="bottom">
          {this[Utils.dashToCamel('render-' + activeItem)]()}
        </Segment>
      </div>
    )
  }
}

registerComponent('CO2eCalcAdmin', CO2eCalcAdmin);
