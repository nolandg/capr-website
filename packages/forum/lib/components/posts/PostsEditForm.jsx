import { Components, registerComponent, withEdit, withDocument, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Form } from 'semantic-ui-react'
import EditForm from '../common/EditForm';

class PostsEditForm extends Component {
  constructor(props) {
    const fields = ['title', 'body'];
    const defaultNewDocument = {
      title: 'Article Title',
      body: 'Type your article body here',
    }

    super(props, fields, defaultNewDocument);
  }

  render(){
    return (
      <Form>
        <Form.Input label="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        <Components.RichTextEditor name="body" value={this.state.body} onChange={this.handleChange} />
      </Form>
    )
  }

}
// options for withDocument HoC
const queryOptions = {
  queryName: 'MyPostsQuery',
  collection: Posts,
  fragmentName: 'PostsPage',
  fetchPolicy: 'network-only',
  enableCache: false,
  pollInterval: 0,
};
registerComponent('PostsEditForm', PostsEditForm,
  [withDocument, queryOptions],
  [withEdit, {collection: Posts, fragmentName: 'PostsPage'}],
  [withRemove, {collection: Posts}],
  [withNew, {collection: Posts, fragmentName: 'PostsPage'}],
  withCurrentUser
);
