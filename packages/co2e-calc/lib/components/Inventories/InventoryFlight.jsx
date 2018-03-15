import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';

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
      <Components.EditModal component={Components.FlightActivityRecordEditForm} collection={ActivityRecords}
        title="Add a Flight"
        buttonAttrs={{content: 'Add a Flight', icon: 'plus', color: 'blue'}} />
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="natural-gas" {...rest}
        recordsTableComponent={Components.FlightActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryFlight', InventoryFlight);
