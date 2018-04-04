import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container, Segment } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class AboutUsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center" content="About CAPR" />
        <Segment>
          Describe CAPR here.<br/><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Segment>
        <Divider hidden />
        <Header as="h2" textAlign="center" content="Mission Statement" icon="rocket"/>
        <Segment>
          Mission statement here.<br/><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Segment>
        <Divider hidden />
      </Container>
    )
  }
}

AboutUsPage.propTypes = {
};

registerComponent('AboutUsPage', AboutUsPage, withCurrentUser);
