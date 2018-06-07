import { Components, registerComponent, withList, getCollection } from 'meteor/vulcan:core';
import React, { Component } from 'react';

const Posts = getCollection('Posts');

class EditableContentInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Default content',
      historicalVersion: null,
    }
  }

  render() {
    const {results, loading, contentKey, contentType} = this.props;
    if(loading) return 'Loading...';
    let document, body;
    if(results && results.length){
      document = results[0];
      body = <div className="body" dangerouslySetInnerHTML={{__html: document.htmlBody}} />;
    }else{
      body = 'Default body';
    }

    if(this.state.historicalVersion){
      document = this.state.historicalVersion;
    }

    return (
      <div className="editable-content">
        <Components.EditModal document={document} saveAsNew={true} component={Components.PostsEditForm} collection="Posts"
          title="Edit Content" buttonAttrs={{size: 'mini', content: 'Edit', compact: true, className: 'edit-content', icon: 'pencil'}} contentKey={contentKey}
          hideBody={contentType === 'plain-text'} hideTitle={contentType === 'rich-text'}
          bodyLabel={null} titleLabel={null} showHistory={true} documents={results}
          onSuccess={() => this.props.refetch()}/>
        {body}
      </div>
    );
  }
}
const queryOptions = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'EditableContentList',
  limit: 100,
};
registerComponent('EditableContentInner', EditableContentInner, [withList, queryOptions]);

class EditableContent extends Component {
  render() {
    const { contentKey, ...rest } = this.props;
    return <Components.EditableContentInner terms={{view: 'keyHistory', contentKey}} {...rest} contentKey={contentKey} />
  }
}
registerComponent('EditableContent', EditableContent);
