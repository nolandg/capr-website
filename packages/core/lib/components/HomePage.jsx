import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Header, Divider } from 'semantic-ui-react'
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
          <Link to="#" className="cell homes">
            <div className="image" />
            <Header as="h2">Carbon Wise Homes</Header>
          </Link>
          <Link to="/roadmap" className="cell roadmap">
            <div className="wrapper">
              <Header as="h2">
                <div className="row"><span className="first-letter">R</span>educe</div>
                <div className="row"><span className="first-letter">O</span>ffset</div>
                <div className="row"><span className="first-letter">A</span>dapt</div>
                <div className="row"><span className="first-letter">D</span>rawdown</div>
              </Header>
            </div>
          </Link>
          <Link to="/carbon-wise-footprint-calculator" className="cell footprint">
            <div className="image" />
            <Header as="h2">What's Your Footprint?</Header>
          </Link>
          <Link to="#" className="cell question">
            <div className="image" />
            <Header as="h2">What's the Big Deal with Carbon?</Header>
          </Link>
        </div>
        <Divider section hidden />
      </div>
    )
  }

}

registerComponent('HomePage', HomePage, withCurrentUser);
