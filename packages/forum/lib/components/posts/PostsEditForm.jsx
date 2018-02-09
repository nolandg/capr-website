import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Form } from 'semantic-ui-react'
import EditForm from '../common/EditForm';

class PostsEditForm extends EditForm {
  constructor(props) {
    const defaultNewDocument = {
      title: 'Article Title',
      body: 'Type your article body here',
    }

    super(props, defaultNewDocument);
  }

  render(){
    return (
      <Form>
        <Form.Input label="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        <Form.Field>
          <label>Article Body</label>
          <Components.RichTextEditor name="body" value={this.state.body} onChange={this.handleChange} />
        </Form.Field>
      </Form>
    )
  }
}

registerComponent('PostsEditForm', PostsEditForm,
  [withEdit, {collection: Posts, fragmentName: 'PostsPage'}],
  [withRemove, {collection: Posts}],
  [withNew, {collection: Posts, fragmentName: 'PostsPage'}],
  withCurrentUser
);
