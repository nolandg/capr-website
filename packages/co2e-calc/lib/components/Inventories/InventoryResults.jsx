import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';

class InventoryResults extends Component {
  render(){
    const { inventory } = this.props;

    return (
      <div>
        <Components.InventoryStats inventory={inventory} />
        <Divider hidden />
        <Components.InventoryPieChart inventory={inventory} />
        <Divider hidden />
        <Components.EmissionsTimeline inventory={inventory} width="100%" height={500} />
      </div>
    )
  }
}

registerComponent('InventoryResults', InventoryResults);
