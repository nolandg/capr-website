import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Loader, Menu, Icon, } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import moment from 'moment';

class MyInventories extends Component {
  state = {
    startDate: moment().startOf('year'),
    endDate: moment().endOf('year'),
    interval: 'year',
  }

  incrementYear = () => {
    this.setState({
      startDate: this.state.startDate.add(1, 'years'),
      endDate: this.state.endDate.add(1, 'years'),
    });
  }

  decrementYear = () => {
    this.setState({
      startDate: this.state.startDate.subtract(1, 'years'),
      endDate: this.state.endDate.subtract(1, 'years'),
    });
  }

  render(){
    if(this.props.loading) return (
      <Loader />
    )

    const { startDate, endDate } = this.state;
    const records = this.props.results;
    const recordsForPeriod = records.filter((record) => {
      return moment(record.startDate).isBetween(startDate, endDate, null, '[]') ||
             moment(record.endDate).isBetween(startDate, endDate, null, '[]');
    });

    return (
      <div  className="my-inventories">
        <div  className="heading">
          <Menu icon compact attached="top">
            <Menu.Item>
              <Icon name='cogs' />
            </Menu.Item>

            <Menu.Item header as="h3" className="title">Your {startDate.year()} Footprint</Menu.Item>

            <Menu.Item onClick={this.decrementYear}>
              <Icon name='chevron left' />
            </Menu.Item>

            <Menu.Item header>
              <Icon name='calendar' />&nbsp;{startDate.year()}
            </Menu.Item>

            <Menu.Item onClick={this.incrementYear}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </div>


        <Components.InventoryTimeline activityRecords={records}
          startDate={startDate} endDate={endDate} width="100%" height={200}
        />

        <div className="add-to-inventory-wrapper">
          <Divider hidden />
          <Header as="h2" textAlign="center">What do you want to add?</Header>
          <Components.AddToInventoryForm activityRecords={recordsForPeriod} startDate={startDate} endDate={endDate} />
        </div>

        <Divider hidden />
        <Divider hidden />
      </div>
    )
  }
}

registerComponent('MyInventories', MyInventories, [withList, {
  collection: ActivityRecords,
  queryName: 'activityRecordsList',
  fragmentName: 'AcivityRecordsList',
}]);
