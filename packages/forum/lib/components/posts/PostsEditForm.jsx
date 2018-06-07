import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Form } from 'semantic-ui-react'
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';

class PostsEditForm extends EditForm {
  constructor(props) {
    const fields = ['title', 'body', 'contentKey'];
    super(props, fields);
    _.set(this.state, 'values.contentKey', props.contentKey);
  }

  render(){
    const { FormField, RichTextField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <FormField label="Title" name="title" placeholder="Type Article Title Here" {...fieldProps} />
        <RichTextField label="Article Body" name="body" placeholder="Type the body of the article here" {...fieldProps} />
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
