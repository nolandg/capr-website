import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class OtherUsersInventories extends Component {
  render(){
    const userId = this.props.params.userId
    return <Components.MyInventories terms={{view: 'userInventoriesRecords', userId}} userId={userId} />
  }
}
registerComponent('OtherUsersInventories', OtherUsersInventories);
