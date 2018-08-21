import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid} from 'semantic-ui-react';

class InventoryGenericActivity extends Component {
  render(){
    const { intro, editArea, recordsTableComponent, activityRecords, activity, inventory } = this.props;
    const RecordsTableComponent = recordsTableComponent;

    return (
      <div>
        <Grid stackable padded reversed="mobile" verticalAlign="middle">

          <Grid.Column width={8}>
            {intro}

            {editArea}
          </Grid.Column>

          <Grid.Column width={8}>
            <Components.ActivityCompletion activityRecords={activityRecords} activity={activity} inventory={inventory} />
          </Grid.Column>

        </Grid>

        <Divider hidden />
        <RecordsTableComponent records={this.props.activityRecords} showUserColumn={false} showActivityColumn={false}/>
      </div>
    )
  }
}



registerComponent('InventoryGenericActivity', InventoryGenericActivity);
