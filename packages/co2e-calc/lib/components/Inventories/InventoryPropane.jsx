import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryPropane extends Component {

  renderIntro = () => {
    return (
      <p>
        An introduction about propane.
      </p>
    );
  }

  renderEditArea = () => {
    return (
      <Components.AddRecordButton component={Components.PropaneActivityRecordEditForm} activity="propane"
        title="Add Propane" content="Add a Propane" inventory={this.props.inventory}/>
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="propane" {...rest}
        recordsTableComponent={Components.PropaneActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryPropane', InventoryPropane);
