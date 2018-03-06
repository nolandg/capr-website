import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Header, Loader, Menu, Icon, Segment } from 'semantic-ui-react';
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
    const { startDate, endDate } = this.state;

    if(this.props.loading) return (
      <Loader />
    )

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
              <Icon name='calendar' />&nbsp;{this.state.startDate.year()}
            </Menu.Item>

            <Menu.Item onClick={this.incrementYear}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </div>


        <Components.InventoryTimeline activityRecords={this.props.results}
          startDate={startDate} endDate={endDate} width="100%" height={200}
        />

        <Container>
          <Divider hidden />
          <Header as="h2" textAlign="center">What do you want to add?</Header>
          <Components.AddToInventoryForm activityRecords={this.props.results} />
        </Container>

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
