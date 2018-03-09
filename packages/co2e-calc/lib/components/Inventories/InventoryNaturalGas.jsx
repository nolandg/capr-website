import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';

class InventoryNaturalGas extends Component {

  renderIntro = () => {
    return (
      <p>
        Your carbon footprint due to natural gas is calculated by the ammount of gas you consume
        in gigajoules. This information can be found on your Fortis BC bill. Simply add all your bills
        for the year and your CO<sub>2</sub>e will automatically be calculated.
        <br/><br/>
        Instructions on how to find this information on your bill will be shown when you add a bill below.
      </p>
    );
  }

  renderEditArea = () => {
    return (
      <Components.EditModal component={Components.NaturalGasActivityRecordEditForm} collection={ActivityRecords}
        title="Add a Fortis BC bill"
        buttonAttrs={{content: 'Add another Fortis BC bill', icon: 'plus', color: 'blue'}} />
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
