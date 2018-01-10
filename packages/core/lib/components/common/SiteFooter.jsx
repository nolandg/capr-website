import React, { PropTypes, PureComponent } from 'react';
import { Container, Segment } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class SiteFooter extends PureComponent {
  render (){
    return (
      <footer className="site-footer">
        <Segment inverted basic size="small" textAlign="center">
          <Container>
            &copy;&nbsp;Copyright 2017: Climate Action Powell River
          </Container>
        </Segment>
      </footer>
    )
  }
}

SiteFooter.propTypes = {
};

registerComponent('SiteFooter', SiteFooter, withCurrentUser);
