import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Grid, Image, Header, Menu } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';

class SiteHeader extends PureComponent {
  render (){
    return (
      <header className="site-header">
        <Grid>

          {/* Computer Header */}
          <Grid.Row columns={1} only="tablet computer" className="site-title-computer">
            <Grid.Column>
              <Header as="h1" textAlign="center">
                Climate Action Powell River
                <Menu secondary floated="right" className="user-menu">
                  <Components.UserMenuItems />
                </Menu>
                <Header.Subheader>A clever statement here</Header.Subheader>
              </Header>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} only="tablet computer">
            <Grid.Column>
              <Components.SiteMenu />
            </Grid.Column>
          </Grid.Row>

          {/* Mobile Header */}
          <Grid.Row columns={1} only="mobile" className="site-title-mobile">
            <Grid.Column>
              <Menu secondary compact>
                <Button icon onClick={this.props.toggleSidebar} basic className="toggle-sidebar">
                  <Icon name='bars' />
                </Button>
              </Menu>
              <Image src='/logo.png' size='small' inline className="site-logo"/>
              <Header as="h1" textAlign="left">
                Climate Action Powell River
                <Header.Subheader>A clever statement here</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </header>
    )
  }
}

SiteHeader.propTypes = {
  toggleSidebar: PropTypes.func,
};

registerComponent('SiteHeader', SiteHeader, withUI, withCurrentUser);
