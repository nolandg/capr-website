import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';
// import { Header } from 'semantic-ui-react';

class InventoryVehicle extends Component {

  renderIntro = () => {
    return (
      <p>
        Personal vehicles are generally one of the largest contributers to your personal carbon footprint
        and hence one of the most important to measure.
        <br/><br />
        You can measure your carbon footprint from your vehicles by either entering how much fuel
        you've bought or by knowing how far you've driven (odometer readings). Knowing how much fuel
        you've bought is the preferred method because it's much more accurate.
      </p>
    );
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
