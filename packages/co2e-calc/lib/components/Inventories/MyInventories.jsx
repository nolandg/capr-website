import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Inventories } from '../../modules/Inventories';

class MyInventories extends Component {

  render(){
    if(this.props.currentUserLoading || this.props.loading) return (
      <Loader />
    )

    const inventories = this.props.results;

    return <Components.UserInventories
              terms={{view: 'userActivityRecords', userId: this.props.currentUser._id}}
              inventories={inventories}
            />
  }
}

const listOptions = {
  collection: Inventories,
  queryName: 'inventoriesList',
  fragmentName: 'InventoriesList',
};
registerComponent('MyInventories', MyInventories, withCurrentUser, [withList, listOptions]);
