import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Dimmer, Header, Loader, Menu, Icon, Container, Dropdown } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import moment from 'moment';
import { Inventories } from '../../modules/Inventories';
import { withRouter } from 'react-router';

class UserInventories extends Component {
  state = {
    startDate: moment().startOf('year'),
    endDate: moment().endOf('year'),
    interval: 'year',
    inventoryEditModalOpen: false,
  }

  incrementYear = () => {
    if(this.state.startDate.year() >= moment().year()) return;

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

  handleEditInventoryClick = () => {
    this.setState({inventoryEditModalOpen: true});
  }

  closeEditInventoryModal = () => {
    this.setState({inventoryEditModalOpen: false});
  }

  handleBackClick = () => {
    console.log(this.props.router);
    this.props.router.push('/');
  }

  render(){
    if(this.props.loading) return (
      <Dimmer active style={{height: '100vh'}}>
        <Loader content="Loading..." size="massive"/>
      </Dimmer>
    );

    const { startDate, endDate } = this.state;
    const inventory = this.props.inventories.find(i => {
      return moment(i.startDate).isSame(startDate, 'day') && moment(i.endDate).isSame(endDate, 'day');
    });
    const records = this.props.results;
    let recordsForPeriod = records;
    if(inventory){
      recordsForPeriod = records.filter((record) => {
        return moment(record.startDate).isBetween(inventory.startDate, inventory.endDate, null, '[]') ||
               moment(record.endDate).isBetween(inventory.startDate, inventory.endDate, null, '[]');
      });
    }
    const year = startDate.year();

    return (
      <div  className="my-inventories">
        <Components.EditModal component={Components.InventoryEditForm} collection={Inventories}
          trigger={null}
          open={this.state.inventoryEditModalOpen}
          document={inventory}  icon="home"
          title={`Update Your ${year} Home Info`}
          showDelete={true}
          onClose={this.closeEditInventoryModal}
          deleteQuestion="Are you sure you want to delete information about this year's footprint?"
          deleteTitle="Delete Footprint Info?"
        />

        <div  className="heading">
          <Menu icon compact attached="top">
            <Dropdown item icon="bars">
              <Dropdown.Menu>

                <Dropdown.Item onClick={this.handleEditInventoryClick} disabled={!inventory}>
                  <Icon name="home" />
                  Update your {year} home details
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item onClick={this.handleBackClick}>
                  <Icon name="chevron left" />
                  Back to CAPR website
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item header as="h3" className="title">Your {year} Footprint</Menu.Item>

            <Menu.Item onClick={this.decrementYear}>
              <Icon name='chevron left' />
            </Menu.Item>

            <Menu.Item header>
              <Icon name='calendar' />&nbsp;{year}
            </Menu.Item>

            <Menu.Item onClick={this.incrementYear} disabled={startDate.year() >= moment().year()}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </div>

        {inventory?
          <div>
            <Components.ActivityTimeline inventory={inventory} width="100%" height={200} />

            <div className="add-to-inventory-wrapper">
              <Divider hidden />
              <Header as="h1" textAlign="center">What do you want to add?</Header>
              <Components.AddToInventoryForm activityRecords={recordsForPeriod} inventory={inventory} />
            </div>

            {inventory.chartData && inventory.chartData.totals.total?
              <div>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider />
                <Divider hidden />
                <Divider hidden />
                <Header as="h1" textAlign="center">Your Results</Header>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Components.InventoryResults inventory={inventory} />

                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Container text>
                  <Header as="h1" textAlign="center">What You Can Do!</Header>
                  <Divider hidden />
                  <Components.WhatYouCanDo inventory={inventory} />
                </Container>

                <Divider hidden />
                <Divider hidden />
              </div>
            :null}

          </div>
        :
          <Container textAlign="center">
            <Divider hidden />
            <Header as="h3" textAlign="center">
              It looks like you haven't started your {year} footprint yet
            </Header>
            <Components.EditModal component={Components.InventoryEditForm} collection={Inventories}
              year={year} icon="home"
              title={`Update Your ${year} Home Details`}
              showDelete={false}
              buttonAttrs={{content: `Start Your ${year} Footprint`, icon: 'plus', color: 'green', size: 'massive' }} />

          </Container>
        }

        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    )
  }
}

const withListOptions = {
  collection: ActivityRecords,
  queryName: 'activityRecordsList',
  fragmentName: 'ActivityRecord',
};
registerComponent('UserInventories', UserInventories, withRouter, [withList, withListOptions]);
