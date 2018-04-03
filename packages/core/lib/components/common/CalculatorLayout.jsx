import { Components, registerComponent } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import { Icon, Menu } from 'semantic-ui-react'
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withUI from './withUI.js';

class CalculatorLayout extends PureComponent {
  toggleVisibility = () => {
    this.props.toggleSidebar();
  }

  clickSite = () => {
    if(this.props.ui.showSidebar) this.props.hideSidebar();
  }

  render(){
    return (
      <div id="app">

        <Helmet>
          <link href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" rel="stylesheet" type="text/css"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400" rel="stylesheet" />
        </Helmet>

        {/* <header className="calculator-header">
          <Menu secondary className="user-menu" size="tiny">
            <Menu.Item header>Carbon Wise Footprint Calculator</Menu.Item>
            <Components.UserMenuItems position="right" />
          </Menu>
        </header> */}

        <div className="site-content">{this.props.children}</div>
        <Components.SiteFooter />

      </div>
    )
  }
}

CalculatorLayout.propTypes = {
  currentRoute: PropTypes.object,
  ui: PropTypes.object,
  toggleSidebar: PropTypes.func,
  hideSidebar: PropTypes.func,
  children: PropTypes.node,
}

registerComponent('CalculatorLayout', CalculatorLayout, withUI, withRouter);
