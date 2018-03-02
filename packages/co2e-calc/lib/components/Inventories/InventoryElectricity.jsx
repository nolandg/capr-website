import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider} from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords';

class InventoryElectricity extends Component {
  render(){

    return (
      <div>
        <Components.ActivityCompletion activityRecords={this.props.activityRecords} filterActivity="electricity" />
        <Components.EditModal component={Components.ElectricityActivityRecordEditForm} collection={ActivityRecords}
          title="Add a BC Hydro bill"
          buttonAttrs={{content: 'Add another BC Hydro bill', icon: 'plus', color: 'green'}} />
        <Divider hidden />
        <Components.ElectricityActivityRecordsTable records={this.props.activityRecords} />
      </div>
    )
  }
}



registerComponent('InventoryElectricity', InventoryElectricity);
