import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class AboutUs extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Header as="h1" textAlign="center">About CAPR</Header>
        <Components.UnderConstruction />
      </div>
    )
  }
}

AboutUs.propTypes = {
};

registerComponent('AboutUs', AboutUs, withCurrentUser);
