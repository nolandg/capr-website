import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class ProjectsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center">Projects</Header>
        Give Noland a list of projects with at least a description and photo for each one!
        <Divider hidden />
      </Container>
    )
  }
}

ProjectsPage.propTypes = {
};

registerComponent('ProjectsPage', ProjectsPage, withCurrentUser);
