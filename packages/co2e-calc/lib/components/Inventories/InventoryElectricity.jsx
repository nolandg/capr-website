import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class InventoryElectricity extends Component {

  renderIntro = () => {
    return (
      <p>
        Your carbon footprint due to electricity is calculated by the ammount of electricity you consume
        in kilowatt-hours. This information can be found on your BC Hydro bill. Simply add all your bills
        for the year and your CO<sub>2</sub>e will automatically be calculated.
        <br/><br/>
        Instructions on how to find this information on your bill will be shown when you add a bill below.
      </p>
    );
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
