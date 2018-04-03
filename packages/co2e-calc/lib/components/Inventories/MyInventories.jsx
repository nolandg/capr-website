import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader, Container, Divider, Dimmer, Header, Icon, Segment } from 'semantic-ui-react';
import { Inventories } from '../../modules/Inventories';
import { Link } from 'react-router';

class MyInventories extends Component {
  state = { initialDelay: true }

  componentDidMount = () => {
    setTimeout(() => this.setState({initialDelay: false}), 2000);
  }

  render(){
    const otherUsersInventory = !!this.props.userId;

    if(!otherUsersInventory && this.props.currentUserLoading || this.props.loading || this.state.initialDelay) return (
      <Dimmer active style={{height: '100vh'}}>
        <Loader content="Loading..." size="massive"/>
      </Dimmer>
    );

    const userId = otherUsersInventory?this.props.userId:this.props.currentUser._id;

    if(!otherUsersInventory && !this.props.currentUser) return (
      <Container textAlign="center">
        <Divider hidden />
        It looks like you're not logged in.<br />
        Go <Link to="/">back</Link> to the main page to login.
        <Divider hidden />
      </Container>
    );

    const inventories = this.props.results;

    const innerElement = <Components.UserInventories terms={{view: 'userActivityRecords', userId}} inventories={inventories} />;

    if(otherUsersInventory) return (
      <Container>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Icon name="search" />Reviewing Footprint:</Header>
        <Divider hidden />
        <Divider hidden />
        <Segment>
          {innerElement}
        </Segment>
      </Container>
    );
    else return innerElement;
  }
}

const listOptions = {
  collection: Inventories,
  queryName: 'Inventory',
  fragmentName: 'Inventory',
  pollInterval: 5000,
};
registerComponent('MyInventories', MyInventories, withCurrentUser, [withList, listOptions]);
