import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container, Segment } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class Quizz extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center" content="Pop Quizz!" />

        Yvon, send me your quizz questions.

        <Divider hidden />
      </Container>
    )
  }
}

registerComponent('Quizz', Quizz, withCurrentUser);
