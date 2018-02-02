import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Menu, Dropdown, Segment, Popup, Icon} from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';
import Users from 'meteor/vulcan:users';

class UserMenuItems extends PureComponent {
  render () {
    let trigger;
    if(this.props.currentUser){
      trigger = (
        <Menu.Item>
          <Icon name="user" />
          Hi {Users.getDisplayName(this.props.currentUser)}
          <Icon name="caret down" />
        </Menu.Item>
      );
    }else{
      trigger = (
        <Menu.Item><Icon name="user" />Login/Sign Up</Menu.Item>
      );
    }

    return(
      <Popup trigger={trigger} flowing on="click">
        {/* <Popup.Header>Login/Signup</Popup.Header> */}
        <Popup.Content>
          <Components.AccountsLoginForm />
        </Popup.Content>
      </Popup>
    );
  }
}

UserMenuItems.propTypes = {
};

registerComponent('UserMenuItems', UserMenuItems, withRouter, withUI, withCurrentUser);
