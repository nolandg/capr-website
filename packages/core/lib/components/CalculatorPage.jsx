import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class CalculatorPage extends PureComponent {
  render (){
    return (
      <Components.MyInventories />
    )
  }
}

CalculatorPage.propTypes = {
};

registerComponent('CalculatorPage', CalculatorPage, withCurrentUser);
