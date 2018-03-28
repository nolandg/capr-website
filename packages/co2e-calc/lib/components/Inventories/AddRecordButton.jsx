import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';

class AddRecordButton extends Component {
  render(){
    const { component, title, activity, content, ...rest } = this.props;
    const color = ActivityRecords.Utils.activityToColor(activity);
    const icon = ActivityRecords.Utils.activityToIconClass(activity);

    return (
      <Components.EditModal component={component} collection={ActivityRecords} {...rest}
        title={title} icon={icon} color={color}
        style={{backgroundColor: color, color: '#FFF'}}
        inventory={this.props.inventory}
        buttonAttrs={{content: content, icon: 'plus', style: {backgroundColor: color, color: '#FFF'}}} />
    )
  }
}



registerComponent('AddRecordButton', AddRecordButton);
