import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Divider, Header } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';


class MyInventories extends Component {

  render(){

    return (
      <div>
        <Divider hidden />
        <Components.InventoryTimeline activityRecords={this.props.results} width="100%" height={200} />

        <Header as="h2">What do you want to add?</Header>
        <Components.AddToInventoryForm />

      </div>
    )
  }
}

registerComponent('MyInventories', MyInventories, [withList, {
  collection: ActivityRecords,
  queryName: 'activityRecordsList',
  fragmentName: 'AcivityRecordsList',
}]);
