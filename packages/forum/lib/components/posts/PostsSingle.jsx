import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsSingle = (props, context) => {
  return <Components.PostsPageView documentId={props.params._id} />
};

registerComponent('PostsSingle', PostsSingle);
