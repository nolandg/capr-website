import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class PostsPage extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Container text>
          <Header as="h1" textAlign="center">Articles</Header>
          <Components.PostsList />
        </Container>
      </div>
    )
  }
}

PostsPage.propTypes = {
};

registerComponent('PostsPage', PostsPage, withCurrentUser);
