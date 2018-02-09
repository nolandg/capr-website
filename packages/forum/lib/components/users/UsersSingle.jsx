import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Divider } from 'semantic-ui-react';

const UsersSingle = (props, context) => {
  return (
    <Components.UsersProfile userId={props.params._id} slug={props.params.slug} />
  )
};

UsersSingle.displayName = "UsersSingle";

registerComponent('UsersSingle', UsersSingle);
