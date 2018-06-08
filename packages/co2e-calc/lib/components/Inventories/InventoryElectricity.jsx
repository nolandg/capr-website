import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryElectricity extends Component {

  renderIntro = () => {
    return <Components.EditableRichText contentKey={`inventory-intro-electricity`} />;
  }

  renderEditArea = () => {
    return (
      <Components.EditRecordButton component={Components.ElectricityActivityRecordEditForm} activity="electricity"
        title="Add a BC Hydro bill" content="Add another BC Hydro bill" inventory={this.props.inventory}/>
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="electricity" {...rest}
        recordsTableComponent={Components.ElectricityActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryElectricity', InventoryElectricity);
