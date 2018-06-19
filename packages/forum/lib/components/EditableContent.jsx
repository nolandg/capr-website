import { Components, registerComponent, withList, getCollection, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import React, { Component } from 'react';

const Posts = getCollection('Posts');

class EditableRichText extends Component {
  render() {
    return <Components.EditableContent contentType="rich-text" {...this.props} />
  }
}
registerComponent('EditableRichText', EditableRichText);

class EditablePlainText extends Component {
  render() {
    return <Components.EditableContent contentType="plain-text" {...this.props} />
  }
}
registerComponent('EditablePlainText', EditablePlainText);

class EditableContentInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Default content',
      historicalVersion: null,
    }
  }

  render() {
    const {results, loading, contentKey, contentType, className} = this.props;

    if(loading){
      console.log('Stil loading... ', this.props);
      setTimeout(()=> this.props.refetch(), 1000);
      return 'Loading...';
    }

    let document, body;
    if(results && results.length){
      document = results[0];
      if(contentType === 'rich-text')
        body = <div className={className} dangerouslySetInnerHTML={{__html: document.htmlBody}} />;
      else if(contentType === 'plain-text')
        body = <span className={className}>{document.title}</span>;
    }else{
      body = <span className={className}>hover over this text and click "Edit"</span>;
    }

    if(this.state.historicalVersion){
      document = this.state.historicalVersion;
    }

    return (
      <div className="editable-content">
        <Components.EditModal contentKey={contentKey} document={document} component={Components.PostsEditForm} collection="Posts"
          title="Edit Content" saveAsNew={true}
          buttonAttrs={{size: 'small', content: 'Edit', compact: true, className: 'edit-content', icon: 'pencil', color: 'orange'}}
          hideBody={contentType === 'plain-text'} hideTitle={contentType === 'rich-text'}
          bodyLabel={null} titleLabel={null} showHistory={true} documents={results}
          onSuccess={() => this.props.refetch()}/>
        {body}
      </div>
    );
  }
}
const innerQueryOptions = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'EditableContentList',
  limit: 100,
};
registerComponent('EditableContentInner', EditableContentInner, [withList, innerQueryOptions]);

class LockedEditableContent extends Component {
  render() {
    const { loading, contentType, results, className } = this.props;

    if(loading){
      console.log('Stil loading... ', this.props);
      return 'Loading...';
    }

    else {
      if(!results || !results.length){
        return 'No content here yet';
      }else if(contentType === 'rich-text'){
        return <div className={className} dangerouslySetInnerHTML={{__html: results[0].htmlBody}} />;
      }else if(contentType === 'plain-text'){
        return <span className={className}>{results[0].title}</span>;
      }
    }
  }
}
const lockedQueryOptions = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'EditableContentList',
  limit: 1,
};
registerComponent('LockedEditableContent', LockedEditableContent, [withList, lockedQueryOptions]);

class EditableContent extends Component {
  render() {
    const { contentKey, loading, currentUser, ...rest } = this.props;
    const isAdmin = this.props.currentUser && Users.canDo(this.props.currentUser, 'core.admin');

    if(!isAdmin) {
      return <Components.LockedEditableContent terms={{view: 'keyHistory', contentKey}} {...rest} contentKey={contentKey} />
    }
    return <Components.EditableContentInner terms={{view: 'keyHistory', contentKey}} {...rest} contentKey={contentKey} />
  }
}
registerComponent('EditableContent', EditableContent, withCurrentUser);
