import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class Posts extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Header as="h1" textAlign="center">Resources</Header>
        <Components.UnderConstruction />
      </div>
    )
  }
}

Posts.propTypes = {
};

registerComponent('Posts', Posts, withCurrentUser);
