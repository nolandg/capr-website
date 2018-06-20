import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class ContactUsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`contact-us-title`} /></Header>
        <Components.EditableRichText contentKey={`contact-us-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('ContactUsPage', ContactUsPage, withCurrentUser);
