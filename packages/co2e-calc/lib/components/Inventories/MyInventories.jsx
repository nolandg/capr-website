import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

class MyInventories extends Component {

  render(){
    if(this.props.currentUserLoading) return (
      <Loader />
    )
    
    return <Components.UserInventories terms={{view: 'userActivityRecords', userId: this.props.currentUser._id
    }}/>
  }
}

registerComponent('MyInventories', MyInventories, withCurrentUser);
