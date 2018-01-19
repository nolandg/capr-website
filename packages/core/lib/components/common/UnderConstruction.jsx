import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class UnderConstruction extends PureComponent {
  render (){
    return (
      <div className="under-construction">
      </div>
    )
  }
}

UnderConstruction.propTypes = {
};

registerComponent('UnderConstruction', UnderConstruction, withCurrentUser);
