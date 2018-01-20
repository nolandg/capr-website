import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class AboutUs extends PureComponent {
  render (){
    return (
      <div>
        <Components.UnderConstruction />
      </div>
    )
  }
}

AboutUs.propTypes = {
};

registerComponent('AboutUs', AboutUs, withCurrentUser);
