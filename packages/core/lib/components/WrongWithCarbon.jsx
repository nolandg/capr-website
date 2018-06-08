import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container } from 'semantic-ui-react'
import { Components, registerComponent } from 'meteor/vulcan:core';


class WrongWithCarbon extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`wrong-with-carbon-title`} /></Header>
        <Components.EditableRichText contentKey={`wrong-with-carbon-body`} />
        <Divider hidden />
      </Container>
    )
  }
}

registerComponent('WrongWithCarbon', WrongWithCarbon);
