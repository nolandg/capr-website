import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment} from 'semantic-ui-react';
import { Utils } from 'meteor/vulcan:lib';

class CO2eCalcAdmin extends PureComponent {
  state = { activeItem: 'records' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderActions = () => {
    return (
      <div>
        <Components.EditModal title="New Activity Record" component={Components.ActivityRecordsEditForm}
          buttonAttrs={{content: 'Add new activity record', icon: 'plus'}} />
      </div>
    )
  }

  renderRecords = () => {
    return (
      <div>
        <Components.ActivityRecordsList />
      </div>
    )
  }

  render(){
    const { activeItem } = this.state;

    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item content="Actions" icon="lightning" name='actions' active={activeItem === 'actions'} onClick={this.handleItemClick} />
          <Menu.Item content="Records" icon="copy" name='records' active={activeItem === 'records'} onClick={this.handleItemClick} />
        </Menu>

        <Segment attached="bottom">
          {this[Utils.dashToCamel('render-' + activeItem)]()}
        </Segment>
      </div>
    )
  }
}

registerComponent('CO2eCalcAdmin', CO2eCalcAdmin);
