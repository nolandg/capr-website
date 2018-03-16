import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';

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
      <Components.EditModal component={Components.PropaneActivityRecordEditForm} collection={ActivityRecords}
        title="Add a Propane"
        buttonAttrs={{content: 'Add propane', icon: 'plus', color: 'blue'}} />
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
