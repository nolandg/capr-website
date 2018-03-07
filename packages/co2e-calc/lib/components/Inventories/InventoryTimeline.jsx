import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { EmissionFactors } from '../../modules/EmissionFactors/index.js';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Line, ReferenceLine, LineChart, Area } from 'recharts';
import { Item, Icon } from 'semantic-ui-react';
import moment from 'moment';

/**********************************************************************************/
/* CustomTooltip
/**********************************************************************************/
function CustomTooltip({active, record}){
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
              <Icon className={ActivityRecords.Utils.activityToIcon(record.activity)} style={{color: color}}/>
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

/**********************************************************************************/
/* InventoryTimeline
/**********************************************************************************/
class InventoryTimeline extends Component {
  state = {
    activeRecord: null,
  }

  cachedMassagedData = {
    data: null,
    recordsJson: null,
  }

  getRecordsSpanningDate = (date, records) => {
    return records.filter((record) => {
      return moment(date).isBetween(record.startDate, record.endDate, null, '[]');
    });
  }

  getMassagedData = (records) => {
    const recordsJson = JSON.stringify(records);
    if(this.cachedMassagedData.recordsJson === recordsJson) return this.cachedMassagedData.data;

    const data = [];
    const activities = {};
    const categories = [];
    const dates = [];

    // Activities
    records.forEach((record) => {
      if(!activities[record.activity]) activities[record.activity] = [];
      const seriesName = record.activity + '.' + activities[record.activity].length;

      const seriesText =  ActivityRecords.Utils.activityValueToText(record.activity);

      if(categories.indexOf(seriesText) === -1) categories.push(seriesText);

      const startOfSeriesDataPoint = {[seriesName]: seriesText, date: new Date(record.startDate).valueOf()};4
      const endOfSeriesDataPoint = {[seriesName]: seriesText, date: new Date(record.endDate).valueOf()};4

      data.push(startOfSeriesDataPoint);
      data.push(endOfSeriesDataPoint);

      activities[record.activity].push({
        seriesName,
        record,
      });

      dates.push({ date: record.startDate, type: 'start', record });
      dates.push({ date: record.endDate, type: 'end', record });
    });

    // Emissions
    const sortedDates = [...dates].sort((a, b) => {
      if(moment(a.date).isBefore(b.date)) return -1;
      if(moment(a.date).isSame(b.date)) return 0;
      else return 1;
    })

    sortedDates.forEach((date) => {
      const simultaneousRecords = this.getRecordsSpanningDate(date.date, records);
      const newDataPoint = {
        date: moment(date.date).valueOf(),
      };
      let sameActivityCount = 0;

      simultaneousRecords.forEach((record) => {
        const seriesText = ActivityRecords.Utils.activityValueToText(record.activity);
        const co2ePerDay = EmissionFactors.calcCo2e(record)*1000/record.dayCount;
        newDataPoint[seriesText] = co2ePerDay;

        if(record.activity === date.record.activity) sameActivityCount++;
      });

      data.push(newDataPoint);

      if((sameActivityCount === 1) && date.type === 'end'){
        const seriesText = ActivityRecords.Utils.activityValueToText(date.record.activity);
        data.push({...newDataPoint, date: moment(date.date).add(1, 'seconds').valueOf(), [seriesText]: 0});
      }
    });

    const returnData = {activities, data, categories};
    this.cachedMassagedData.data = returnData;
    this.cachedMassagedData.recordsJson = recordsJson;
    return returnData;
  }

  getTickXValues = () => {
    const year = this.props.startDate.year();

    return [1,2,3,4,5,6,7,8,9,10,11,12].map((m)=>{1
      return moment(year + '-' + m + '-01', 'YYYY-M-DD').valueOf();
    });
  }

  renderReferenceLines = (categories) => {
    const tickXValues = this.getTickXValues();

    const horizontalLines = categories.map((category) => { return (
      <ReferenceLine key={category} y={category} stroke="#DDD" strokeWidth="1" strokeDasharray="3 0" yAxisId="activities"/>
    )});

    const verticalLines = tickXValues.map((x) => { return (
      <ReferenceLine key={x} x={x} stroke="#DDD" strokeWidth="1" strokeDasharray="3 3"/>
    )});

    return [
      ...horizontalLines,
      ...verticalLines,
    ];
  }

  renderLines = (activities, data) => {
    const lines = [];
    const dot = {strokeWidth: 4, r: 8, fill: '#FFF'};
    const strokeWidth = 20;

    for(let activity in activities){
      activities[activity].forEach(({seriesName, record}) => {
        const isActive = this.state.activeRecord && this.state.activeRecord._id === record._id;
        const stroke =  ActivityRecords.Utils.activityToColor(activity, isActive);

        lines.push(
          <Line dataKey={seriesName} key={seriesName + '__lines'} yAxisId="activities"
            dot={dot} activeDot={false}  stroke={stroke} strokeWidth={strokeWidth}
            onMouseEnter={() => { this.setState({activeRecord: record}) }}
            onMouseLeave={() => { this.setState({activeRecord: null}) }}
          />
        );
      });
    }

    return lines;
  }

  renderAreas = (activities, data) => {
    const areas = [];

    areas.push(
      <Area dataKey="Electricity" stackId="1" yAxisId="emissions" type="stepAfter" key="electricity"
         fill="rgba(255,0,0,.2)"
      />

    );

    return areas;
  }

  render(){
    const { width = '100%', height = 200, startDate, endDate } = this.props;
    const {data, activities, categories} = this.getMassagedData(this.props.activityRecords);

    const domain = [
      moment(startDate).valueOf(),
      moment(endDate).valueOf(),
    ];
    const tickFormatter = (tick) => {
      return moment(tick).format('MMM');
    };
    const tickXValues = this.getTickXValues();


    return (
      <ResponsiveContainer width={width} height={height}>
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
          <XAxis dataKey="date"
            type="number"
            scale="time"
            ticks={tickXValues}
            domain={domain}
            tickFormatter={tickFormatter}
            padding={{ left: 10, right: 0 }}
            axisLine={false}
            tickLine={false}
            allowDataOverflow={true}
          />
          <YAxis
            type="category"
            padding={{ top: 20, bottom: 20 }}
            scale="point" // workaround for vertical offset from lines
            axisLine={false}
            tickLine={false}
            yAxisId="activities"
          />
          <YAxis
            type="number"
            yAxisId="emissions"
            orientation="right"
          />

          <Tooltip cursor={false} active={!!this.state.activeRecord} content={<CustomTooltip record={this.state.activeRecord}/>}/>

          {this.renderReferenceLines(categories)}
          {this.renderAreas(activities, data)}
          {this.renderLines(activities, data)}
        </ComposedChart>
      </ResponsiveContainer>
    )
  }
}

registerComponent('InventoryTimeline', InventoryTimeline);
