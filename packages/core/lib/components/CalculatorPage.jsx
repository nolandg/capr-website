import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class CalculatorPage extends PureComponent {
  render (){
    return (
      <div>
        <Divider hidden />
        <Header as="h1" textAlign="center">Carbon Wise</Header>
        <Components.UnderConstruction />
      </div>
    )
  }
}

CalculatorPage.propTypes = {
};

registerComponent('CalculatorPage', CalculatorPage, withCurrentUser);
