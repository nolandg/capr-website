import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Button, Icon, Menu, Image, Dropdown } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';
import Users from 'meteor/vulcan:users';

class SiteMenu extends PureComponent {
  renderCalculatorItem = (path) => {
    return (
      <Menu.Item as={Link} to="/carbon-wise-footprint-calculator" name="calculator" active={path==='/carbon-footprint-calculator'}>
        <Button color="green"><Icon name="calculator" />Your Footprint</Button>
      </Menu.Item>
    )
  }

  render (){
    const isSidebar = this.props.isSidebar;
    const path = this.props.router.location.pathname;
    const isAdmin = this.props.currentUser && Users.canDo(this.props.currentUser, 'core.admin');
    const hideSidebar = this.props.hideSidebar;

    return (
      <Menu
        className="site-menu"
        fluid
        secondary={!isSidebar} inverted={isSidebar} vertical={isSidebar} size={isSidebar?'large':'large'}
        onClick={this.props.hideSidebar}
        >
        <Link to="/"><Image src='/logo.png' size='small' inline className="site-logo"/></Link>
        <Menu.Item as={Link} to="/projects" name="projects" active={path==='/projects'}>
          Projects
        </Menu.Item>
        <Menu.Item as={Link} to="/posts" name="resource" active={path==='/resource'}>
          Articles
        </Menu.Item>

        <Dropdown item text="About Us" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={this.props.hideSidebar}>
            <Dropdown.Item as={Link} to="/about-us" text="About CAPR" />
            <Dropdown.Item as={Link} to="/contact-us" text="Contact Us"/>
            <Dropdown.Item as={Link} to="/our-partners" text="Our Partners"/>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Fun Stuff" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={this.props.hideSidebar}>
            <Dropdown.Item as={Link} to="/song-for-the-earth-video" text="Pop Quizz!"/>
            <Dropdown.Item as={Link} to="/quizz" text="Song for the Earth"/>
          </Dropdown.Menu>
        </Dropdown>

        {isAdmin?
          <Menu.Item as={Link} to="/admin" name="Admin" active={path==='/admin'}>
            Admin
          </Menu.Item>
        :null}
        {isSidebar?<Components.UserMenuItems inverted sidebar/>:null}
        {isSidebar?this.renderCalculatorItem(path):null}
        {!isSidebar?(
          <Menu secondary floated="right">
            {this.renderCalculatorItem(path)}
          </Menu>
        ):null}
      </Menu>
    )
  }
}

SiteMenu.propTypes = {
  isSidebar: PropTypes.bool,
  router: PropTypes.object,
  hideSidebar: PropTypes.func,
  hideUserMenu: PropTypes.bool,
};

registerComponent('SiteMenu', SiteMenu, withRouter, withUI, withCurrentUser);
