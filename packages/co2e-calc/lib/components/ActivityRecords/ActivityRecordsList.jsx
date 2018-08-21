import { Components, registerComponent, withList, withRemove, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import classNames from 'classnames';
import { Loader, Table, Button, Confirm} from 'semantic-ui-react';
import moment from 'moment';

class ActivityRecordsList extends Component{

  render() {
    const { results, loading, count, totalCount, loadMore, networkStatus} = this.props;
    // const hasMore = totalCount > results.length;

    if(loading) return <Loader />

    if(!results || !results.length) return (
      <div>Nothing to show :-(</div>
    )


    return (
      <div>
        <Components.ActivityRecordsTable records={this.props.results}
          editTitle="Edit Activity Record"
          editFormComponent={Components.ActivityRecordsEditForm}
          deleteTitle="Confirm Delete Record"
          deleteQuestion="Are you sure you want to delete this activity record?"
          showActivityColumn={false}
          showUserColumn={false}
        />
      </div>
    );

  }
}

ActivityRecordsList.displayName = "ActivityRecordsList";

ActivityRecordsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

const options = {
  collection: ActivityRecords,
  queryName: 'activityRecordsList',
  fragmentName: 'ActivityRecord',
  limit: 1000,
};

registerComponent('ActivityRecordsList', ActivityRecordsList,
  withCurrentUser,
  [withList, options],
  [withRemove, {collection: ActivityRecords}]
);
