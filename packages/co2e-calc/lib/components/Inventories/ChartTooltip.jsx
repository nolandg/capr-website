import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { Item, Icon } from 'semantic-ui-react';
import moment from 'moment';

export default function CustomTooltip({active, record}){
  if(!active) return null;

  if(!record) return null;

  const activityText =  ActivityRecords.Utils.activityValueToText(record.activity);
  const color = ActivityRecords.Utils.activityToColor(record.activity);
  const startDate = moment(record.startDate).format('MMM D');
  const endDate = moment(record.endDate).format('MMM D');

  return (
    <div className="timeline-tooltip">
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>
              <Icon className={ActivityRecords.Utils.activityToIconClass(record.activity)} style={{color: color}}/>
              {activityText}
            </Item.Header>
            <Item.Meta><Icon name="calendar" />&nbsp;for {startDate} to {endDate}</Item.Meta>
            <Item.Description>
              More info here
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
}
