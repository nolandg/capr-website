import { Components, registerComponent } from 'meteor/vulcan:core';
import { } from 'semantic-ui-react'
import React, { PropTypes, PureComponent } from 'react';
import { withRouter } from 'react-router';

class WrongWithCarbon extends PureComponent {
  selectCategory = (category) => {
    this.props.router.push('/wrong-with-carbon/' + category);
  }

  render(){
    // const category = this.props.params.category;

    return (
      <div className="roadmap-page">
        i
      </div>
    )
  }

}

registerComponent('WrongWithCarbon', WrongWithCarbon, withRouter);
