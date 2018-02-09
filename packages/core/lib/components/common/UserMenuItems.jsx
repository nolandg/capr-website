import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Menu, Popup, Icon, Divider} from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';
import Users from 'meteor/vulcan:users';

class UserMenuItems extends PureComponent {
  render () {
    const path = this.props.router.location.pathname;
    let greeting;
    if(this.props.currentUser){
      if(this.props.sidebar) greeting = 'My Account';
      else greeting = `${Users.getDisplayName(this.props.currentUser)}`;
    }else{
      greeting = 'Login/Sign Up';
    }

    if(this.props.sidebar){
      if(this.props.currentUser) return (
        <Menu.Item as={Link} to={'/users/' + this.props.currentUser.slug} name="my-account" active={path==='/users'}>
          <Icon name="user" />{greeting}
        </Menu.Item>
      ); else return (
        <Menu.Item as={Link} to="/login" name="login" active={path==='/login'}>
          <Icon name="user" />{greeting}
        </Menu.Item>
      );
    }

    let trigger;
    if(this.props.currentUser){
      trigger = (
        <Menu.Item><Icon name="user" />{greeting}<Icon name="caret down" /></Menu.Item>
      );
    }else{
      trigger = (
        <Menu.Item><Icon name="user" />{greeting}</Menu.Item>
      );
    }

    return(
      <Popup trigger={trigger} flowing on="click">
        <Popup.Content>
          <Components.AccountsLoginForm />
          {this.props.currentUser?(
            <div>
              <Divider />
              <Link to={'/users/' + this.props.currentUser.slug}><Icon name="vcard outline" />&nbsp;My Profile</Link>
            </div>
          ):null}
        </Popup.Content>
      </Popup>
    );
  }
}

UserMenuItems.propTypes = {
};

registerComponent('UserMenuItems', UserMenuItems, withRouter, withUI, withCurrentUser);
