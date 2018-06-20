import { Components, registerComponent } from 'meteor/vulcan:core';
import { Header, Container } from 'semantic-ui-react'
import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'react-router';

class CarbonWise extends PureComponent {
  selectCategory = (category) => {
    this.props.router.push('/carbon-wise-homes/' + category);
  }

  renderTopLevel = () => {
    return (
      <div className="top-level">
        <div className="transporation" onClick={() => this.selectCategory('transporation')}>
          <Components.EditableRichText contentKey={`carbon-wise-transporation-image`} className="category-image"/>
          <h2><Components.EditablePlainText contentKey={`carbon-wise-transporation-title`}/></h2>
        </div>
        <div className="heating" onClick={() => this.selectCategory('heating')}>
          <Components.EditableRichText contentKey={`carbon-wise-heating-image`} className="category-image"/>
          <h2><Components.EditablePlainText contentKey={`carbon-wise-heating-title`}/></h2>
        </div>
        <div className="food" onClick={() => this.selectCategory('food')}>
          <Components.EditableRichText contentKey={`carbon-wise-food-image`} className="category-image"/>
          <h2><Components.EditablePlainText contentKey={`carbon-wise-food-title`}/></h2>
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
      <Container text className="category">
        <Components.EditableRichText contentKey={`carbon-wise-${category}-image`} className="category-image"/>
        <h1><Components.EditablePlainText contentKey={`carbon-wise-${category}-title`} /></h1>
        <Components.EditableRichText contentKey={`carbon-wise-${category}-body`} />
      </Container>
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
