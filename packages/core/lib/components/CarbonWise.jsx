import { Components, registerComponent } from 'meteor/vulcan:core';
import { Header } from 'semantic-ui-react'
import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'react-router';

class CarbonWise extends PureComponent {
  selectCategory = (category) => {
    this.props.router.push('/carbon-wise-homes/' + category);
  }

  imageUrls = {
    transporation: '/packages/core/lib/assets/images/bike.jpg',
    heating: '/packages/core/lib/assets/images/stove.png',
    food: '/packages/core/lib/assets/images/sushi.png',
  }

  titles = {
    transporation: 'Personal Transporation',
    heating: 'Heating Your Home',
    food: 'What You Eat',
  }

  content = {
    transporation:
      <div>
        This is content about transporation.
      </div>,
    heating:
      <div>
        This is content about heating.
      </div>,
    food:
      <div>
        This is content about food.
      </div>,
  }

  renderTopLevel = () => {
    return (
      <div className="top-level">
        <div className="transporation" onClick={() => this.selectCategory('transporation')}>
          <img src={this.imageUrls.transporation} />
          <h2>Transporation</h2>
        </div>
        <div className="heating" onClick={() => this.selectCategory('heating')}>
          <img src={this.imageUrls.heating} />
          <h2>Heating</h2>
        </div>
        <div className="food" onClick={() => this.selectCategory('food')}>
          <img src={this.imageUrls.food} />
          <h2>Food</h2>
        </div>
      </div>
    );
  }

  renderBreadCrumbs = () => {
    return (
      null
    );
  }

  renderCategory = () => {
    const category = this.props.params.category;

    return(
      <div className="category">
        <img src={this.imageUrls[category]} />
        <h1>{this.titles[category]}</h1>
        {this.content[category]}
      </div>
    );
  }

  render(){
    const category = this.props.params.category;

    return (
      <div className="carbon-wise-page">
        {this.renderBreadCrumbs()}
        {!category?
          <div className="intro">
            <div>
              <Header as="h1">
                The ROAD Map
                <Header.Subheader>
                  I think we should put an introduction here explaining what the Carbon Wise Homes program is.
                </Header.Subheader>
              </Header>
            </div>
          </div>
        :null}
        {!category?this.renderTopLevel():this.renderCategory(category)}
      </div>
    )
  }

}

registerComponent('CarbonWise', CarbonWise, withRouter);
