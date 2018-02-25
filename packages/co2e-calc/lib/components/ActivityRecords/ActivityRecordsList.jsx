import { Components, registerComponent, withList, withRemove, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import classNames from 'classnames';
import { Loader, Table, Button, Confirm} from 'semantic-ui-react';

class ActivityRecordsList extends PureComponent{
  state = { deleteConfirmOpen: false }

  handleEdit = (record) => {

  }

  handleDelete = (record) => {
    this.setState({deleteConfirmOpen: true});
  }

  handleDeleteConfirm = (record) => {
    const p = this.props.removeMutation({documentId: record._id})
      .then(()=>{

      }).catch((error) => {
        console.error(error);
      })
      .done(()=>{
        this.setState({deleteConfirmOpen: false});
      });
    console.log(record.activity);
  }

  handleDeleteCancel = (record) => {
    this.setState({deleteConfirmOpen: false});
  }

  renderActivityRecordRow = (record) => {
    return (
      <Table.Row key={record._id}>
        <Table.Cell className="user">
          {record.user.displayName}
        </Table.Cell>
        <Table.Cell className="activity">
          {record.activity}
        </Table.Cell>
        <Table.Cell className="start">
          {record.start}
        </Table.Cell>
        <Table.Cell className="end">
          {record.end}
        </Table.Cell>
        <Table.Cell className="actions">
          <Button icon="pencil" size="mini" color="blue" onClick={()=>{this.handleEdit(record._id)}} />
          <Button icon="delete" size="mini" color="red" onClick={()=>{this.handleDelete(record._id)}} />
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    let {className, results, loading, count, totalCount, loadMore, networkStatus} = this.props;

    const loadingMore = networkStatus === 2;

    if (results && results.length) {

      const hasMore = totalCount > results.length;

      return (
        <div>
          <Confirm
            open={this.state.deleteConfirmOpen}
            onCancel={this.handleDeleteCancel}
            onConfirm={this.handleDeleteConfirm}
          />

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Activity</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {results.map(record => this.renderActivityRecordRow(record))}
            </Table.Body>
          </Table>

          {hasMore ?
            <Components.ActivityRecordsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} /> :
            <div></div>
          }
        </div>
      )
    } else if (loading) {
      return (
        <div className={classNames(className, 'records-list')}>
          <Loader />
        </div>
      )
    } else {
      return (
        <div>
          Nothing to show :-(
        </div>
      )
    }

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
  fragmentName: 'AcivityRecordsList',
};

registerComponent('ActivityRecordsList', ActivityRecordsList,
  withCurrentUser,
  [withList, options],
  [withRemove, {collection: ActivityRecords}]
);
