import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Grid, Item, Segment, Button, Icon, Header, Container, Divider } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';

class HomePage extends PureComponent {
  renderSong = () => {
    return (
      <div className="embed-wrapper">
        <Embed id='y0vBlXrW0RU' placeholder='/song_thumb.jpg' source='youtube'/>
      </div>
    );
  }

  render(){

    return (
      <div className="homepage">
        <div className="grid">
          <a href="#" className="cell homes">
            <div className="image" />
            <Header as="h2">Carbon Wise Homes</Header>
          </a>
          <a href="#" className="cell roadmap">
            <Header as="h2">
              <div className="row"><span className="first-letter">R</span>educe</div>
              <div className="row"><span className="first-letter">O</span>ffset</div>
              <div className="row"><span className="first-letter">A</span>dapt</div>
              <div className="row"><span className="first-letter">D</span>rawdown</div>
            </Header>
          </a>
          <a href="#" className="cell footprint">
            <div className="image" />
            <Header as="h2">What's Your Footprint?</Header>
          </a>
          <a href="#" className="cell question">
            <div className="image" />
            <Header as="h2">What's the Big Deal with Carbon?</Header>
          </a>
        </div>
        <Divider section hidden />
      </div>
    )
  }

}

registerComponent('HomePage', HomePage, withCurrentUser);
