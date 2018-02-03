import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Divider } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class LoginPage extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Container>
          <Header as="h1">Login or Sign Up</Header>
          <Components.AccountsLoginForm />
        </Container>
      </div>
    )
  }
}

LoginPage.propTypes = {
};

registerComponent('LoginPage', LoginPage, withCurrentUser);
