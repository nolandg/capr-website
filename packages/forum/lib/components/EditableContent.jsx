import { Components, registerComponent, withList, getCollection } from 'meteor/vulcan:core';
import React, { Component } from 'react';

const Posts = getCollection('Posts');

class EditableContentInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Default content',
    }
  }

  handleChange = (e, { value }) => {
    this.setState({value});
    console.log('set value to: ', value);
  }

  render() {
    const {results, loading, contentKey} = this.props;
    if(loading) return 'Loading...';
    let document, body;
    if(results && results.length){
      document = results[0];
      body = <div className="body" dangerouslySetInnerHTML={{__html: document.htmlBody}} />;
    }else{
      body = 'Default body';
    }

    console.log('Results: ', results);

    return (
      <div className="editable-content">
        <Components.EditModal document={document} saveAsNew={true} component={Components.PostsEditForm} collection="Posts"
          title="Edit Content" buttonAttrs={{size: 'mini', content: 'Edit', compact: true}} contentKey={contentKey}
          onSuccess={() => this.props.refetch()}/>
        {body}
        <div>
          Desired Key: {contentKey}<br />
          Document Content Key: {document?document.contentKey:'none'}
        </div>
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
