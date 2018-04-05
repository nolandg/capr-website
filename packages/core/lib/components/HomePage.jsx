import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Header, Divider } from 'semantic-ui-react'
import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';

class HomePage extends PureComponent {
  render(){

    return (
      <div className="homepage">
        <div className="grid">
          <Link to="carbon-wise-homes" className="cell homes">
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
          <Link to="/whats-wrong-with-carbon" className="cell question">
            <div className="image" />
            <Header as="h2">What's wrong with Carbon?</Header>
          </Link>
        </div>
        <Divider section hidden />
      </div>
    )
  }

}

registerComponent('HomePage', HomePage, withCurrentUser);
