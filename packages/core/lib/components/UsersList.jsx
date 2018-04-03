import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import Users from 'meteor/vulcan:users';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader, Table, Dimmer, Container, Divider, Button, Image, Icon } from 'semantic-ui-react';
import moment from 'moment';

class UsersList extends Component {

  renderRow = (user) => {
    const isAdmin = Users.isMemberOf(user, 'adminTier2');

    return (
      <Table.Row key={user._id} warning={isAdmin}>
        <Table.Cell><Image size="tiny" rounded src={user.avatarUrl} /></Table.Cell>
        <Table.Cell>{user.username}</Table.Cell>
        <Table.Cell>{user.displayName}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{moment(user.createdAt).format('MMM D, YYYY')}</Table.Cell>
        <Table.Cell>{isAdmin?'Yes':'No'}</Table.Cell>
        <Table.Cell>
          <Button size="mini" basic icon="search" content="view" onClick={() => this.props.router.push(`/users/${user.slug}`)} />
          <Components.EditModal document={user} title="Edit Profile" component={Components.UsersEditForm} collection="Users"
            showDelete={false} buttonAttrs={{content: 'Edit', icon: 'pencil', size: 'mini', basic: true}} />
        </Table.Cell>
      </Table.Row>
    );
  }

  renderHeader = () => {
    return (
      <Table.Header><Table.Row>
        <Table.HeaderCell><Icon name="picture" /> Avatar</Table.HeaderCell>
        <Table.HeaderCell><Icon name="user" /> User Name</Table.HeaderCell>
        <Table.HeaderCell><Icon name="user" /> Display Name</Table.HeaderCell>
        <Table.HeaderCell><Icon name="envelope" /> Email</Table.HeaderCell>
        <Table.HeaderCell><Icon name="calendar" /> Joined</Table.HeaderCell>
        <Table.HeaderCell><Icon name="key" /> Admin</Table.HeaderCell>
        <Table.HeaderCell><Icon name="lightning" /> Actions</Table.HeaderCell>
      </Table.Row></Table.Header>
    );
  }

  render(){
    if(this.props.loading || this.props.currentUserLoading) return (
      <Dimmer active style={{height: '100vh'}}>
        <Loader content="Loading..." size="massive"/>
      </Dimmer>
    );

    const { results } = this.props;
    if(!results.length) return (
      <Container><Divider hidden />No users :-(</Container>
    );

    return (
      <Table>
        {this.renderHeader()}
        <Table.Body>
          {results.map(this.renderRow)}
        </Table.Body>
      </Table>
    );
  }
}

const listOptions = {
  collection: Users,
  queryName: 'Users',
  fragmentName: 'UsersProfile',
  limit: 100,
};
registerComponent('UsersList', UsersList, withRouter, [withList, listOptions]);
