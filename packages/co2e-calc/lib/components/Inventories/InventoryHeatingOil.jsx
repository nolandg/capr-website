import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryHeatingOil extends Component {

  renderIntro = () => {
    return <Components.EditableRichText contentKey={`inventory-intro-heating-oil`} />;
  }

  renderEditArea = () => {
    return (
      <Components.EditRecordButton component={Components.HeatingOilActivityRecordEditForm} activity="heating-oil"
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
