import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Form, Header, Button, Icon, Divider } from 'semantic-ui-react'
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';
import moment from 'moment';

class PostsEditForm extends EditForm {
  constructor(props) {
    const fields = ['title', 'body', 'contentKey'];
    super(props, fields);
    _.set(this.state, 'values.contentKey', props.contentKey);
  }

  renderRestoreVersion = (doc) => {
    const { hideBody, hideTitle, bodyLabel, titleLabel, contentKey } = this.props;
    const content = (
      <div>
        {moment(doc.createdAt).format('MMM DD, YYYY')}<br />
        at {moment(doc.createdAt).format('h:mm:ss')}<br />
        <small><i>by {doc.user.displayName}</i></small>
      </div>
    );

    return (
      <Components.EditModal document={doc} saveAsNew={true} component={Components.PostsEditForm} collection="Posts" key={doc.createdAt}
        title="Restore from previous version"
        buttonAttrs={{size: 'large', content: content}} contentKey={contentKey}
        hideBody={hideBody} hideTitle={hideTitle}
        bodyLabel={bodyLabel} titleLabel={titleLabel}
        onSuccess={() => {this.props.onSuccess(); if(this.props.closeModal) this.props.closeModal(); }}
      />
    );
  }

  render(){
    const { FormField, RichTextField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const { hideBody, hideTitle, bodyLabel, titleLabel, showHistory, documents } = this.props;

    return (
      <Form error={!!this.state.errors} className="posts-edit-form">
        {this.renderMessages()}

        {!hideTitle?<FormField label={titleLabel} name="title" placeholder="Type Article Title Here" {...fieldProps} />:null}
        {!hideBody?<RichTextField label={bodyLabel} name="body" placeholder="Type the body of the article here" {...fieldProps} />:null}

        {showHistory?
          <div className="history">
            <Divider hidden />
            <Header as="h2" icon>
              <Icon name='history' />
              Previous versions of this content
              <Header.Subheader>
                Click on a date below to restore a previous version
              </Header.Subheader>
            </Header>
            <div className="versions">
              {documents.map((doc) => this.renderRestoreVersion(doc))}
            </div>
          </div>
        :null}
      </Form>
    )
  }
}

PostsEditForm.defaultProps = {
  titleLabel: 'Title',
  bodyLabel: 'Article Body',
  showHistory: false,
}

registerComponent('PostsEditForm', PostsEditForm,
  [withEdit, {collection: Posts, fragmentName: 'PostsPage'}],
  [withRemove, {collection: Posts}],
  [withNew, {collection: Posts, fragmentName: 'PostsPage'}],
  withCurrentUser
);
