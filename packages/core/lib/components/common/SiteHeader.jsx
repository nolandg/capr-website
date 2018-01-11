import React, { PropTypes, PureComponent } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import withUI from './withUI.js';

class SiteHeader extends PureComponent {
  render (){
    return (
      <header className="site-header">
        <Grid>
          <Grid.Row columns={1} only="tablet computer">
            <Grid.Column>
                <Components.SiteMenu />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} only='mobile'>
            <Grid.Column>
              <Button icon onClick={this.props.toggleSidebar} basic>
                <Icon name='bars' />
              </Button>
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
