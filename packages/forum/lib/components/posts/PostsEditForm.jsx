import { Components, registerComponent, withEdit, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Form } from 'semantic-ui-react'

class PostsEditForm extends PureComponent {
  state = {
    title: this.props.document.title,
    body: this.props.document.body,
  };
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submit = () => {
    this.props.editMutation({documentId: this.props.document._id, set: this.state}).then(this.props.closeModal).catch(this.handleError);
    console.log(this.state.body);
  }

  handleError = (error) => {
    console.error(error);
  }

  componentDidMount() {
    if(this.props.registerActions) this.props.registerActions({
      submit: this.submit,
      delete: this.delete,
    });
  }

  render(){
    return (
      <Form>
        <h1>{this.props.document.title}</h1>
        <Form.Input label="Title" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        <Components.RichTextEditor placeholder='Type your post content here' name="body" value={this.state.body} onChange={this.handleChange} />
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
registerComponent('PostsEditForm', PostsEditForm, [withDocument, queryOptions], [withEdit, {collection: Posts, fragmentName: 'PostsPage'}],  withCurrentUser);
