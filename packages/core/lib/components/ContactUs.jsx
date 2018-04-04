import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container, Segment } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class ContactUs extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center" content="Contact Us" icon="phone"/>
        <Segment>
          All the CAPR contact info here.<br/><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Segment>
        <Divider hidden />
      </Container>
    )
  }
}

registerComponent('ContactUs', ContactUs, withCurrentUser);
