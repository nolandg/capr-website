import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Segment } from 'semantic-ui-react';
import { Utils } from 'meteor/vulcan:lib';

class AddToInventoryForm extends Component {
  state = {activeMenuItem: null}

  handleMenuItemClick = (e, { name }) => this.setState({ activeMenuItem: name })

  renderElectricity = () => {
    return 'electricity'
  }

  render(){
    const { activeMenuItem } = this.state;

    return (
      <div>
        <Menu icon="labeled" size="massive" fluid widths={5} tabular attached="top">
          <Menu.Item name="vehicle" active={activeMenuItem === 'vehicle'} onClick={this.handleMenuItemClick}>
            <Icon name="car" />
            Vehicles
          </Menu.Item>
          <Menu.Item name="electricity" active={activeMenuItem === 'electricity'} onClick={this.handleMenuItemClick}>
            <Icon className="bc-hydro" />
            Electricity
          </Menu.Item>
          <Menu.Item name="natural-gas" active={activeMenuItem === 'natural-gas'} onClick={this.handleMenuItemClick}>
            <Icon className="fortis" />
            Natural Gs
          </Menu.Item>
          <Menu.Item name="flights" active={activeMenuItem === 'flights'} onClick={this.handleMenuItemClick}>
            <Icon name="plane" />
            Flights
          </Menu.Item>
          <Menu.Item name="propane" active={activeMenuItem === 'propane'} onClick={this.handleMenuItemClick}>
            <Icon className="propane" />
            Propane
          </Menu.Item>
        </Menu>

        <Segment attached="bottom">
          {activeMenuItem?this[Utils.dashToCamel('render-' + activeMenuItem)]():null}
        </Segment>
      </div>
    )
  }
}

registerComponent('AddToInventoryForm', AddToInventoryForm);
