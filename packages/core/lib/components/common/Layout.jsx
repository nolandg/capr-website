import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Sidebar, Menu, Segment } from 'semantic-ui-react'
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
          <link href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" rel="stylesheet" type="text/css"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400" rel="stylesheet" />
        </Helmet>

        <Sidebar.Pushable>

          <Sidebar className="site-sidebar" animation='overlay' visible={this.props.ui.showSidebar} icon='labeled'
            style={{overflow: 'visible !important'}} width="thin">
            <Segment basic inverted>
              <Components.SiteMenu isSidebar />
            </Segment>
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
  children: PropTypes.node,
}

registerComponent('Layout', Layout, withUI, withCurrentUser);
