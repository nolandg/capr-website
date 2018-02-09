import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Divider } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class LoginPage extends PureComponent {
  render (){
    return (
      <Container>
        <Divider hidden />
        <Header as="h2">Login/Signup</Header>
        <Components.AccountsLoginForm />
      </Container>
    );
  }
}

LoginPage.propTypes = {
};

registerComponent('LoginPage', LoginPage, withCurrentUser);
