import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import withUI from './withUI.js';

class Layout extends PureComponent {
  toggleVisibility = () => {
    this.props.toggleSidebar();
  }

  clickSite = () => {
    if(this.props.ui.showSidebar) this.props.hideSidebar();
  }

  render(){
    const classes = classNames('wrapper site-wrapper', `wrapper-${this.props.currentRoute.name.replace('.', '-')}`);

    return (
      <div id="app">

        <Helmet>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Helmet>

        <Sidebar.Pushable>

          <Sidebar className="site-menu" as={Menu} animation='overlay' width='thin' visible={this.props.ui.showSidebar} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher className={classes} onClick={this.clickSite}>
            <Components.SiteHeader />
            <div className="site-content">{this.props.children}</div>
            <Components.SiteFooter />
          </Sidebar.Pusher>

        </Sidebar.Pushable>

      </div>
    )
  }
}

Layout.propTypes = {
  currentRoute: PropTypes.object,
  ui: PropTypes.object,
  toggleSidebar: PropTypes.func,
  hideSidebar: PropTypes.func,
}

registerComponent('Layout', Layout, withUI, withCurrentUser);
