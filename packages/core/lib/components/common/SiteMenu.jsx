import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Button, Icon, Menu, Image, Dropdown } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';
import Users from 'meteor/vulcan:users';

class SiteMenu extends PureComponent {
  renderCalculatorItem = (path) => {
    const isSidebar = this.props.isSidebar;

    return (
      <Menu.Item as={Link} to="/carbon-wise-footprint-calculator" name="calculator" active={path==='/carbon-footprint-calculator'}>
        <Button color="green" compact={isSidebar?true:false} size={isSidebar?'small':undefined} >
          <Icon name="calculator" />{isSidebar?<span><br /><br /></span>:null}Your Footprint
        </Button>
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

        <Dropdown item text="CAPR" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={hideSidebar}>
            <Dropdown.Item as={Link} to="/about-us" text="About CAPR" />
            <Dropdown.Item as={Link} to="/roadmap" text="ROAD Map"/>
            <Dropdown.Item as={Link} to="/history" text="History"/>
            <Dropdown.Item as={Link} to="/directors" text="Directors"/>
            <Dropdown.Item as={Link} to="/contact-us" text="Contact Us"/>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="News" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={hideSidebar}>
            <Dropdown.Item as={Link} to="/whats-new" text="What's New" />
            <Dropdown.Item as={Link} to="/calendar" text="Calendar"/>
            <Dropdown.Item as={Link} to="/newsletter" text="Newsletter"/>
            <Dropdown.Item as={Link} to="/news-releases" text="News Releases"/>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Articles" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={hideSidebar}>
            <Dropdown.Item as={Link} to="/media-reports" text="Media/Reports" />
            <Dropdown.Item as={Link} to="/local-issues" text="Local Issues"/>
            <Dropdown.Item as={Link} to="/analysis-opinion" text="Analysis/Opinion"/>
            <Dropdown.Item as={Link} to="/climate-science" text="Climate Science"/>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Resources" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={hideSidebar}>
            <Dropdown.Item as={Link} to="/books-on-climate-change" text="Books on Climate Change" />
            <Dropdown.Item as={Link} to="/movies-on-climate-change" text="Movies on Climate Change"/>
            <Dropdown.Item as={Link} to="/links" text="Links"/>
            <Dropdown.Item as={Link} to="/cool-apps" text="Cool Apps"/>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Fun Stuff" pointing={isSidebar?'left':'top'} icon={null}>
          <Dropdown.Menu onClick={hideSidebar}>
            <Dropdown.Item as={Link} to="/quizz" text="Pop Quizz!"/>
            <Dropdown.Item as={Link} to="/song-for-the-earth-video" text="Song for the Earth"/>
            <Dropdown.Item as={Link} to="/photos" text="Photos"/>
            <Dropdown.Item as={Link} to="/cartoons" text="Cartoons"/>
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
