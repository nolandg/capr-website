import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryPropane extends Component {

  renderIntro = () => {
    return <Components.EditableRichText contentKey={`inventory-intro-propane`} />;
  }

  renderEditArea = () => {
    return (
      <Components.EditRecordButton component={Components.PropaneActivityRecordEditForm} activity="propane"
        title="Add Propane" content="Add Propane" inventory={this.props.inventory}/>
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
