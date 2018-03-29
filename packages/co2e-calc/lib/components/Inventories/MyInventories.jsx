import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader, Container } from 'semantic-ui-react';
import { Inventories } from '../../modules/Inventories';
import { Link } from 'react-router';

class MyInventories extends Component {

  render(){
    if(this.props.currentUserLoading || this.props.loading) return (
      <Container><Loader /></Container>
    )
    if(!this.props.currentUser) return (
      <Container>
        It looks like you're not logged in.<br />
        Go <Link to="/">back</Link> to the main page to login.
      </Container>
    );

    const inventories = this.props.results;

    return <Components.UserInventories
              terms={{view: 'userActivityRecords', userId: this.props.currentUser._id}}
              inventories={inventories}
            />
  }
}

const listOptions = {
  collection: Inventories,
  queryName: 'Inventory',
  fragmentName: 'Inventory',
  pollInterval: 5000,
};
registerComponent('MyInventories', MyInventories, withCurrentUser, [withList, listOptions]);
