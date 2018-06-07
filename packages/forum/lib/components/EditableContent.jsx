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
    const {results, loading, key} = this.props;
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
        <Components.EditModal document={document} component={Components.PostsEditForm} collection="Posts"
          title="Edit Content" buttonAttrs={{size: 'mini', content: 'Edit', compact: true}} key={key} />
        {body}
      </div>
    );
  }
}
const queryOptions = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
  limit: 100,
};
registerComponent('EditableContentInner', EditableContentInner, [withList, queryOptions]);

class EditableContent extends Component {
  render() {
    const { contentKey, ...rest } = this.props;
//terms={{view: 'keyHistory', contentKey}}
    return <EditableContentInner  {...rest} contentKey={contentKey} />
  }
}
registerComponent('EditableContent', EditableContent);
