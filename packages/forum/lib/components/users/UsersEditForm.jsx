import { Components, registerComponent, withEdit, withDocument, withRemove, withCurrentUser, withNew, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Container, Form, Divider, Segment, Loader} from 'semantic-ui-react';
import { STATES } from 'meteor/vulcan:accounts';

class UsersEditForm extends Component {
  render(){
    const fields = ['displayName', 'bio'];
    const defaultNewDocument = {
      displayName: 'your name',
      bio: 'Describe yourself to the world!',
    }

    if(this.props.loading) return <Loader />

    return (
      <Components.EditForm {...this.props} fields={fields} defaultNewDocument={defaultNewDocument} document={this.props.document}>
        {/* <Components.AccountsLoginForm formState={STATES.PASSWORD_CHANGE} /> */}
        <Form.Input label="Display Name" name="displayName" value={this.state.displayName} onChange={this.handleChange} />
      </Components.EditForm>
    );
  }
}

UsersEditForm.propTypes = {
};

const queryOptions = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};
registerComponent('UsersEditForm', UsersEditForm,
  withMessages,
  [withDocument, queryOptions],
  [withEdit, {collection: Users, fragmentName: 'UsersProfile'}],
  [withRemove, {collection: Users}],
  [withNew, {collection: Users, fragmentName: 'UsersProfile'}],
  withCurrentUser
);
