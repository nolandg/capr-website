import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container, Embed } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

class SongForTheEarth extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center" content="A Song For the Earth" />
        <p>
          <em>A Song for the World</em> was originaly conceived in September, 2014 to increase awarness
          about climate change and the environment prior to the 2015 Paris Climate Conference.
        </p>

        <div className="embed-wrapper">
          <Embed id='y0vBlXrW0RU' placeholder='/song_thumb.jpg' source='youtube'/>
        </div>

        <Divider hidden />
      </Container>
    )
  }
}

registerComponent('SongForTheEarth', SongForTheEarth, withCurrentUser);
