import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form as SuiForm } from 'semantic-ui-react'
import { withCurrentUser, Components, replaceComponent } from 'meteor/vulcan:core';

class Input extends PureComponent {
  render (){
    return (
      <div>
        I am an Input!!
      </div>
    )
  }
}

Input.propTypes = {
};

// replaceComponent('Input', Input, withCurrentUser);
