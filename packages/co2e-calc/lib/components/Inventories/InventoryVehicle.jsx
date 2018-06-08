import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryVehicle extends Component {

  renderIntro = () => {
    return <Components.EditableRichText contentKey={`inventory-intro-vehicle`} />;
  }

  renderEditArea = () => {
    return (
      <Components.EditRecordButton component={Components.VehicleActivityRecordEditForm} activity="vehicle"
        title="Add a Vehicle" content="Add a Vehicle" inventory={this.props.inventory}/>
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="vehicle" {...rest}
        recordsTableComponent={Components.VehicleActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryVehicle', InventoryVehicle);
