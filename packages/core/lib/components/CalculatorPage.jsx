import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class CalculatorPage extends PureComponent {
  render (){
    if(this.props.currentUserLoading) return 'Loading...';
    
    return (
      <Components.MyInventories terms={{view: 'userInventoriesRecords', userId: this.props.currentUser._id}}/>
    )
  }
}

CalculatorPage.propTypes = {
};

registerComponent('CalculatorPage', CalculatorPage, withCurrentUser);
