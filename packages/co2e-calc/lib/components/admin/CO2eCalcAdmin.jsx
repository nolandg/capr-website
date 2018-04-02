import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment} from 'semantic-ui-react';
import { Utils } from 'meteor/vulcan:lib';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';

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

  render(){
    const { activeItem } = this.state;

    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item content="Dashboard" icon="dashboard" name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
          <Menu.Item content="Footprints" icon="copy" name='inventories-list' active={activeItem === 'inventories-list'} onClick={this.handleItemClick} />
        </Menu>

        <Segment attached="bottom">
          {this[Utils.dashToCamel('render-' + activeItem)]()}
        </Segment>
      </div>
    )
  }
}

registerComponent('CO2eCalcAdmin', CO2eCalcAdmin);
