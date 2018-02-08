import { Components, registerComponent, withEdit, withDocument, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Form } from 'semantic-ui-react'

class PostsEditForm extends PureComponent {
  constructor(props) {
    super(props);
    const defaultNewPost = {
      title: 'Article Title',
      body: 'Type the body of the article here',
    };

    if(this.props.documentId) this.state = (({ title, body }) => ({ title, body }))(this.props.document);
    else this.state = defaultNewPost;
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submit = () => {
    if(this.props.documentId){
      this.props.editMutation({documentId: this.props.documentId, set: this.state})
        .then(this.props.closeModal)
        .catch(this.handleError);
    }else{
      this.props.newMutation({document: this.state})
        .then(this.props.closeModal)
        .catch(this.handleError);
    }
  }

  delete = () => {
    this.props.removeMutation({documentId: this.props.document._id}).then(this.props.documentRemoved).catch(this.handleError);
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
