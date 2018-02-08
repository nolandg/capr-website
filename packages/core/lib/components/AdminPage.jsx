import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class AdminPage extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Container>
          <Header as="h1" textAlign="center">Administration Area</Header>
          <Components.EditModal title="New Article" component={Components.PostsEditForm}
            buttonAttrs={{icon: 'add', content: 'New Article'}} />
        </Container>
      </div>
    )
  }
}

AdminPage.propTypes = {
};

registerComponent('AdminPage', AdminPage, withCurrentUser);
