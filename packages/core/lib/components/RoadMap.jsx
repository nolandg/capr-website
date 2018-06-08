import { Components, registerComponent } from 'meteor/vulcan:core';
import { Header, Container } from 'semantic-ui-react'
import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'react-router';

class RoadMap extends PureComponent {
  selectCategory = (category) => {
    this.props.router.push('/roadmap/' + category);
  }

  renderTopLevel = () => {
    return (
      <div className="top-level">
        <div className="reduce" onClick={() => this.selectCategory('reduce')}>
          <Components.EditableRichText contentKey={`roadmap-reduce-image`} className="category-image"/>
          <h2><span className="first-letter">R</span>educe</h2>
        </div>
        <div className="offset" onClick={() => this.selectCategory('offset')}>
          <Components.EditableRichText contentKey={`roadmap-offset-image`} className="category-image"/>
          <h2><span className="first-letter">O</span>ffset</h2>
        </div>
        <div className="adapt" onClick={() => this.selectCategory('adapt')}>
          <Components.EditableRichText contentKey={`roadmap-adapt-image`} className="category-image"/>
          <h2><span className="first-letter">A</span>dapt</h2>
        </div>
        <div className="drawdown" onClick={() => this.selectCategory('drawdown')}>
          <Components.EditableRichText contentKey={`roadmap-drawdown-image`} className="category-image"/>
          <h2><span className="first-letter">D</span>rawdown</h2>
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
        <Components.EditableRichText contentKey={`roadmap-${category}-image`} className="category-image"/>
        <h1><Components.EditablePlainText contentKey={`roadmap-${category}-title`} /></h1>
        <Container text>
          <Components.EditableRichText contentKey={`roadmap-${category}-body`} />
        </Container>
      </div>
    );
  }

  render(){
    const category = this.props.params.category;

    return (
      <div className="roadmap-page">
        {this.renderBreadCrumbs()}
        {!category?
          <div className="intro">
            <div>
              <Header as="h1">
                The ROAD Map
                <Header.Subheader>
                  I think we should put an introduction here explaining what the road map is.
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

registerComponent('RoadMap', RoadMap, withRouter);
