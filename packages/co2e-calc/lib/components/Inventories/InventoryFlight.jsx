import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryFlight extends Component {

  renderIntro = () => {
    return <Components.EditableRichText contentKey={`inventory-intro-flight`} />;
  }

  renderEditArea = () => {
    return (
      <Components.EditRecordButton component={Components.FlightActivityRecordEditForm} activity="flight"
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
