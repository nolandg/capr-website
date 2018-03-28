import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryFlight extends Component {

  renderIntro = () => {
    return (
      <p>
        Flying around the world (or back and forth to Vancouver) burns a lot of carbon high up in the atmosphere.
        This is an important source of CO<sub>2</sub>e for your personal footprint.
        <br/><br/>
        Simply enter in all the places you've flown this year and we'll calculate the distance and carbon burned.
      </p>
    );
  }

  renderEditArea = () => {
    return (
      <Components.AddRecordButton component={Components.FlightActivityRecordEditForm} activity="flight"
        title="Add a Flight" content="Add a Flight" inventory={this.props.inventory}/>
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="flight" {...rest}
        recordsTableComponent={Components.FlightActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryFlight', InventoryFlight);
