import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';

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
      <Components.EditModal component={Components.HeatingOilActivityRecordEditForm} collection={ActivityRecords}
        title="Add a Heating Oil"
        buttonAttrs={{content: 'Add heating oil data', icon: 'plus', color: 'blue'}} />
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
