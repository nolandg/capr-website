import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/activitys/index.js';
import { Form } from 'semantic-ui-react'
import EditForm from '../common/EditForm';

class ActivityRecordsEditForm extends EditForm {
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

registerComponent('ActivityRecordsEditForm', ActivityRecordsEditForm,
  [withEdit, {collection: ActivityRecords, fragmentName: 'ActivityRecordsPage'}],
  [withRemove, {collection: ActivityRecords}],
  [withNew, {collection: ActivityRecords, fragmentName: 'ActivityRecordsPage'}],
  withCurrentUser
);
