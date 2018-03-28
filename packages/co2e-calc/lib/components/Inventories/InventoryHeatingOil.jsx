import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryHeatingOil extends Component {

  renderIntro = () => {
    return (
      <p>
        An introduction about heating oil.
      </p>
    );
  }

  renderEditArea = () => {
    return (
      <Components.AddRecordButton component={Components.HeatingOilActivityRecordEditForm} activity="heating-oil"
        title="Add Heating Oil" content="Add Heating Oil" inventory={this.props.inventory}/>
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="heating-oil" {...rest}
        recordsTableComponent={Components.HeatingOilActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}

registerComponent('InventoryHeatingOil', InventoryHeatingOil);
