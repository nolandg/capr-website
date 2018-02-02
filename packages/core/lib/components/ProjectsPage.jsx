import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class ProjectsPage extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Header as="h1" textAlign="center">Projects</Header>
        <Components.UnderConstruction />
      </div>
    )
  }
}

ProjectsPage.propTypes = {
};

registerComponent('ProjectsPage', ProjectsPage, withCurrentUser);
