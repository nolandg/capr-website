import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid} from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords';

class InventoryGenericActivity extends Component {
  render(){
    const { intro, editArea, startDate, endDate, recordsTableComponent, activityRecords, activity } = this.props;
    const RecordsTableComponent = recordsTableComponent;

    return (
      <div>
        <Grid stackable padded reversed="mobile" verticalAlign="middle">

          <Grid.Column width={8}>
            {intro}

            {editArea}
          </Grid.Column>

          <Grid.Column width={8}>
            <Components.ActivityCompletion activityRecords={activityRecords} activity={activity} startDate={startDate} endDate={endDate} />
          </Grid.Column>

        </Grid>

        <Divider hidden />
        <RecordsTableComponent records={this.props.activityRecords} />
      </div>
    )
  }
}



registerComponent('InventoryGenericActivity', InventoryGenericActivity);
