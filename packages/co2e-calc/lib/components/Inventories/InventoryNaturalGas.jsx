import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryNaturalGas extends Component {

  renderIntro = () => {
    return <Components.EditableRichText contentKey={`inventory-intro-natural-gas`} />;
  }

  renderEditArea = () => {
    return (
      <Components.EditRecordButton component={Components.NaturalGasActivityRecordEditForm} activity="natural-gas"
        title="Add a Fortis BC Bill" content="Add another Fortis BC bill"  inventory={this.props.inventory}/>
    );
  }

  render(){
    const { ...rest } = this.props;

    return (
      <Components.InventoryGenericActivity activity="natural-gas" {...rest}
        recordsTableComponent={Components.NaturalGasActivityRecordsTable}
        intro={this.renderIntro()}
        editArea={this.renderEditArea()}
      />
    )
  }
}



registerComponent('InventoryNaturalGas', InventoryNaturalGas);
