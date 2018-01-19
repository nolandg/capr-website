import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Button, Icon, Menu, Image } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';

class UserMenuItems extends PureComponent {
  render (){
    return(
      <Menu.Item><Icon name="user" />Login</Menu.Item>
    );
  }
}

UserMenuItems.propTypes = {
};

registerComponent('UserMenuItems', UserMenuItems, withRouter, withUI, withCurrentUser);
