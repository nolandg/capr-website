import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords';

class EditRecordButton extends Component {
  render(){
    const { component, title, activity, content, buttonAttrs, record, size, ...rest } = this.props;
    const finalActivity = activity || (record && record.activity) || '';
    const color = ActivityRecords.Utils.activityToColor(finalActivity);
    const icon = ActivityRecords.Utils.activityToIconClass(finalActivity);
    const buttonIcon = record?'pencil':'plus';

    return (
      <Components.EditModal component={component} collection={ActivityRecords} {...rest}
        title={title} icon={icon} color={color}
        style={{backgroundColor: color, color: '#FFF'}}
        inventory={this.props.inventory}
        document={record} showDelete={!!record}
        buttonAttrs={{size, content, icon: buttonIcon, style: {backgroundColor: color, color: '#FFF'}, ...buttonAttrs}} />
    )
  }
}



registerComponent('EditRecordButton', EditRecordButton);
