import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid} from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords';

class InventoryElectricity extends Component {
  render(){

    return (
      <div>
        <Grid stackable padded reversed="mobile" verticalAlign="middle">

          <Grid.Column width={8}>
            <p>
              Your carbon footprint due to electricity is calculated by the ammount of electricity you consume
              in kilowatt-hours. This information can be found on your BC Hydro bill. Simply add all your bills
              for the year and your CO<sub>2</sub>e will automatically be calculated.
              <br/><br/>
              Instructions on how to find this information on your bill will be shown when you add a bill below.
            </p>

            <Components.EditModal component={Components.ElectricityActivityRecordEditForm} collection={ActivityRecords}
              title="Add a BC Hydro bill"
              buttonAttrs={{content: 'Add another BC Hydro bill', icon: 'plus', color: 'green'}} />
          </Grid.Column>

          <Grid.Column width={8}>
            <Components.ActivityCompletion activityRecords={this.props.activityRecords} filterActivity="electricity" />
          </Grid.Column>

        </Grid>

        <Divider hidden />
        <Components.ElectricityActivityRecordsTable records={this.props.activityRecords} />
      </div>
    )
  }
}



registerComponent('InventoryElectricity', InventoryElectricity);
