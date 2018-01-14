import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Button, Icon, Menu, Image } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';

class SiteMenu extends PureComponent {
  renderUserMenuItem = (path) => {
    return (
      <Menu.Item><Icon name="user" />Login</Menu.Item>
    )
  }

  renderCalculatorItem = (path) => {
    return (
      <Menu.Item as={Link} to="/carbon-footprint-calculator" name="calculator" active={path==='/carbon-footprint-calculator'}>
        <Button color="green"><Icon name="calculator" />Carbon Wise</Button>
      </Menu.Item>
    )
  }

  render (){
    const isSidebar = this.props.isSidebar;
    const path = this.props.router.location.pathname;

    return (
      <Menu
        className="site-menu"
        fluid
        secondary={!isSidebar} inverted={isSidebar} vertical={isSidebar} size={isSidebar?'large':'large'}
        onClick={this.props.hideSidebar}
        >
        <Image src='/logo.png' size='small' inline className="site-logo"/>
        <Menu.Item as={Link} to="/" name="home" active={path==='/'}>
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/projects" name="projects" active={path==='/projects'}>
          Projects
        </Menu.Item>
        <Menu.Item as={Link} to="/resource" name="resource" active={path==='/resource'}>
          Resources
        </Menu.Item>
        <Menu.Item as={Link} to="/about-us" name="about-us" active={path==='/about-us'}>
          About Us
        </Menu.Item>
        {!isSidebar?(
          <Menu.Menu position="right">
            {this.renderUserMenuItem(path)}
          </Menu.Menu>
        ):this.renderUserMenuItem(path)}
        {this.renderCalculatorItem(path)}
      </Menu>
    )
  }
}

SiteMenu.propTypes = {
  isSidebar: PropTypes.bool,
  router: PropTypes.object,
  hideSidebar: PropTypes.func,
};

registerComponent('SiteMenu', SiteMenu, withRouter, withUI, withCurrentUser);
