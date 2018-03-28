import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Segment } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';

const ColoredMenuItem = ({name, label, activeMenuItem, onClick, icon}) => {
  const isActive = activeMenuItem === name;
  const color = ActivityRecords.Utils.activityToColor(name);
  const iconClass = ActivityRecords.Utils.activityToIconClass(name);

  return (
    <Menu.Item name={name} active={isActive} onClick={onClick}
      style={isActive?{borderColor: color}:null}
      >
      <Icon className={iconClass} style={isActive?{color: color}:null}/>
      <span style={isActive?{color: color}:null}>{label}</span>
    </Menu.Item>
  );
}

class AddToInventoryForm extends Component {
  state = {activeMenuItem: 'vehicle'}

  handleMenuItemClick = (e, { name }) => this.setState({ activeMenuItem: name })

  tabNameToComponentName = (tabName) => {
    return ('inventory-' + tabName).replace(/(-.)/g,(x)=>{return x[1].toUpperCase()}).replace(/^./,(x)=>{return x.toUpperCase()});
  }

  render(){
    const { activeMenuItem } = this.state;
    const { inventory } = this.props;
    let Component;

    if(activeMenuItem){
      Component = Components[this.tabNameToComponentName(activeMenuItem)];
    }

    return (
      <div className="add-to-inventory">
        <Menu icon="labeled" size="massive" fluid tabular attached="top" stackable
          style={{
            borderBottomColor: ActivityRecords.Utils.activityToColor(activeMenuItem),
            width: '100% !important',
            marginLeft: '0 !important',
            marginRight: '0 !important',
          }}>
          <ColoredMenuItem name="vehicle" label="Vehicles" onClick={this.handleMenuItemClick} activeMenuItem={activeMenuItem} />
          <ColoredMenuItem name="electricity" label="Electricity" onClick={this.handleMenuItemClick} activeMenuItem={activeMenuItem} />
          <ColoredMenuItem name="natural-gas" label="Natural Gas" onClick={this.handleMenuItemClick} activeMenuItem={activeMenuItem} />
          <ColoredMenuItem name="flight" label="Flights" onClick={this.handleMenuItemClick} activeMenuItem={activeMenuItem} />
          <ColoredMenuItem name="propane" label="Propane" onClick={this.handleMenuItemClick} activeMenuItem={activeMenuItem} />
          <ColoredMenuItem name="heating-oil" label="Heating Oil" onClick={this.handleMenuItemClick} activeMenuItem={activeMenuItem} />
        </Menu>

        <Segment attached="bottom" style={{borderColor: ActivityRecords.Utils.activityToColor(activeMenuItem)}}>
          {Component?<Component activityRecords={this.props.activityRecords} inventory={inventory} />:null}
        </Segment>
      </div>
    )
  }
}

registerComponent('AddToInventoryForm', AddToInventoryForm);
