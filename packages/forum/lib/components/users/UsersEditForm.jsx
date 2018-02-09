import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Form } from 'semantic-ui-react';
import EditForm from '../common/EditForm';

class UsersEditForm extends EditForm {
  constructor(props){
    const defaultNewDocument = {
      displayName: 'your name',
      bio: 'Describe yourself to the world!',
      isAdmin: false,
    };

    super(props, defaultNewDocument);
  }

  render(){
    const state = this.state;

    return (
      <Form>
        <Form.Input label="Display Name" name="displayName" value={state.displayName} onChange={this.handleChange} />
        <Form.Field>
          <label>Bio</label>
          <Components.RichTextEditor name="bio" value={state.bio} onChange={this.handleChange} />
        </Form.Field>
        {Users.canEditField(this.props.currentUser, Users.options.schema.isAdmin, this.props.document)?
          <Form.Checkbox label="Is an Administrator" name="isAdmin" checked={state.isAdmin} onChange={this.handleChange} />
        :null}
      </Form>
    );
  }
}

UsersEditForm.propTypes = {
};

registerComponent('UsersEditForm', UsersEditForm,
  withMessages,
  [withEdit, {collection: Users, fragmentName: 'UsersProfile'}],
  [withRemove, {collection: Users}],
  [withNew, {collection: Users, fragmentName: 'UsersProfile'}],
  withCurrentUser
);
