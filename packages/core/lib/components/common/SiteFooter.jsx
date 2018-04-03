import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Button } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class SiteFooter extends PureComponent {
  state = {
    aboutOpen: false,
  }

  render (){
    return (
      <footer className="site-footer">
        <Segment inverted basic size="small" textAlign="center">
          <Container>
            &copy;&nbsp;Copyright 2017: Climate Action Powell River and:<br /><br />

            <Components.AboutModal onClose={() => this.setState({aboutOpen: false})} open={this.state.aboutOpen}
              trigger={<Button color="green" size="tiny" inverted content="Colibri Carbon: Carbon Accounting Software Solutions" />} />
          </Container>
        </Segment>
      </footer>
    )
  }
}

SiteFooter.propTypes = {
};

registerComponent('SiteFooter', SiteFooter, withCurrentUser);
