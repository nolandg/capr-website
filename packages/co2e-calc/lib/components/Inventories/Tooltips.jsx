import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { Item, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';

function LabeledValue({content, icon, value}){
  return (
    <div className="labeled-value">
      <Label icon={icon} content={content} size="large" pointing="right"/>{value}
    </div>
  );
}

/******************************************************************************************************/
/* Activity Tooltip
/******************************************************************************************************/
export function ActivityTooltip({seriesName, label, inventory}){
  if(!seriesName) return null;

  const date = moment(label);
  const activityText =  ActivityRecords.Utils.activityValueToText(seriesName);
  const color = ActivityRecords.Utils.activityToColor(seriesName);
  const iconClass = ActivityRecords.Utils.activityToIconClass(seriesName);

  const dailyTotals = inventory.chartData.timelineData.dailyTotals;
  const dayEmissions = _.get(dailyTotals, label + '.activityTotals.' + seriesName, 0).toFixed(1);
  const dayPercent = Math.round(_.get(dailyTotals, label + '.activityPercents.' + seriesName, 0));
  const totals = inventory.chartData.totals;
  const totalEmissions = _.get(totals, 'activityTotals.' + seriesName, 0).toFixed(1);
  const totalPercent = Math.round(_.get(totals, 'activityPercents.' + seriesName, 0));

  return (
    <div className="custom-tooltip emissions">
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>
              <Icon className={iconClass} style={{color: color}}/>
              {activityText} CO<sub>2</sub>e Emissions
            </Item.Header>
            <Item.Meta>For {date.format('MMM D')}</Item.Meta>
            <Item.Description>
              <LabeledValue icon="calendar" content="Emissions this day" value={dayEmissions + ' kg'} />
              <LabeledValue icon="pie chart" content="Portion this day" value={dayPercent + ' %'} />
              <LabeledValue icon="plus" content="Total for year" value={totalEmissions + ' kg'} />
              <LabeledValue icon="pie chart" content="Portion of year" value={totalPercent + ' %'} />
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
}

/******************************************************************************************************/
/* Record Tooltip
/******************************************************************************************************/
export function RecordTooltip({record}){
  if(!record) return null;

  const activityText =  ActivityRecords.Utils.activityValueToText(record.activity);
  const color = ActivityRecords.Utils.activityToColor(record.activity);
  const startDate = moment(record.startDate).format('MMM D');
  const endDate = moment(record.endDate).format('MMM D');
  const iconClass = ActivityRecords.Utils.activityToIconClass(record.activity);

  return (
    <div className="custom-tooltip activity">
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>
              <Icon className={iconClass} style={{color: color}}/>
              {activityText}
            </Item.Header>
            <Item.Meta><Icon name="calendar" />&nbsp;for {startDate} to {endDate}</Item.Meta>
            <Item.Description>
              {ActivityRecords.Utils.getDescription(record)}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
}
