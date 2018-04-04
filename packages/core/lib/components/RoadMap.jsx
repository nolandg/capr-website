import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Grid, Item, Segment, Button, Icon, Header, Container, Divider } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';

class RoadMap extends PureComponent {
  state = {
    category: null,
  }

  renderTopLevel = () => {
    return (
      <div className="top-level">
        <div className="reduce">
          <img src="/packages/core/lib/assets/images/reduce.jpg" />
          <h2><span className="first-letter">R</span>educe</h2>
        </div>
        <div className="offset">
          <img src="/packages/core/lib/assets/images/offset.jpg" />
          <h2><span className="first-letter">O</span>ffset</h2>
        </div>
        <div className="adapt">
          <img src="/packages/core/lib/assets/images/adaptation.jpg" />
          <h2><span className="first-letter">A</span>dapt</h2>
        </div>
        <div className="drawdown">
          <img src="/packages/core/lib/assets/images/drawdown.jpg" />
          <h2><span className="first-letter">D</span>rawdown</h2>
        </div>
      </div>
    );
  }

  renderCategory = () => {

  }

  render(){
    const { category } = this.state;

    return (
      <div className="roadmap">
        {!category?this.renderTopLevel():this.renderCategory(category)}
      </div>
    )
  }

}

registerComponent('RoadMap', RoadMap);
