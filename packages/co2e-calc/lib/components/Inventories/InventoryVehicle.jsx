import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { ActivityRecords } from '../../modules/ActivityRecords';
// import { Header } from 'semantic-ui-react';

class InventoryVehicle extends Component {

  renderIntro = () => {
    return (
      <p>
        Vehicles
      </p>
    );
  }

  renderEditArea = () => {
    return (
      <Components.VehiclesActivityRecordEditForm activityRecords={this.props.activityRecords}/>
    );
  }

  render(){

    return (
      <Components.InventoryGenericActivity activity="vehicle" activityRecords={this.props.activityRecords}
        recordsTableComponent={Components.VehicleActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryVehicle', InventoryVehicle);
