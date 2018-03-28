import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Line, ReferenceLine, Area, CartesianGrid, Label } from 'recharts';
// import { Item, Icon } from 'semantic-ui-react';
import ChartTooltip from './ChartTooltip';
import moment from 'moment';

/**********************************************************************************/
/* CustomActivityTick
/**********************************************************************************/
function CustomActivityTick(props){
  const {visibleTicksCount, verticalAnchor, payload, ...rest } = props;
  const value = ActivityRecords.Utils.activityValueToText(payload.value);
  // const iconClass = ActivityRecords.Utils.activityToIconClass(payload.value);

  return (
    <text {...rest} textAnchor="end" alignmentBaseline="middle">
      {value}
    </text>
  );
}

/**********************************************************************************/
/* InventoryTimeline
/**********************************************************************************/
class InventoryTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responsiveContainerWorkaround: 1,
      activeRecord: null,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({responsiveContainerWorkaround: 0});
    }, 2000);
  }

  renderReferenceLines = () => {
    const { activityYValues, monthlyXTickValues } = this.props.inventory.chartData.timelineData;

    const verticalLines = monthlyXTickValues.map((x) => { return (
      <ReferenceLine key={x + '__x-reference-line'} x={x} stroke="#DDD" strokeWidth="1" strokeDasharray="3 6"/>
    )});

    const horizontalLines = activityYValues.map((y) => {
      const color = ActivityRecords.Utils.activityToColor(y);

      return (
        <ReferenceLine key={y + '__y-reference-line'} y={y} stroke={color} strokeWidth="2" strokeDasharray="1 0" yAxisId="activities"/>
      );
    });

    return [
      ...verticalLines,
      ...horizontalLines,
    ];
  }

  renderLines = () => {
    const { activitySeriesNames } = this.props.inventory.chartData.timelineData;
    const lines = [];
    const dot = {strokeWidth: 4, r: 8, fill: '#FFF'};
    const strokeWidth = 20;

    activitySeriesNames.forEach(({seriesName, record}) => {
      const isActive = this.state.activeRecord && this.state.activeRecord._id === record._id;
      const stroke =  ActivityRecords.Utils.activityToColor(record.activity, isActive?'active':null);

      lines.push(
        <Line dataKey={seriesName} key={seriesName + '__line'} yAxisId="activities"
          dot={dot} activeDot={false}  stroke={stroke} strokeWidth={strokeWidth}
          onMouseEnter={() => { this.setState({activeRecord: record}) }}
          onMouseLeave={() => { this.setState({activeRecord: null}) }}
        />
      );
    });

    return lines;
  }

  renderAreas = () => {
    return this.props.inventory.chartData.timelineData.emissionsSeriesNames.map((seriesName) => {
      const fill = ActivityRecords.Utils.activityToColor(seriesName, 'faded');
      const stroke = ActivityRecords.Utils.activityToColor(seriesName, 'faded-stroke');

      return (
        <Area dataKey={seriesName} stackId="1" yAxisId="emissions" type="monotone" key={seriesName}
          activeDot={false}
          stroke={stroke} strokeWidth="0"
          fill={fill}
          connectNulls={true}
        />
      );
    });
  }

  render(){
    const { width, height, inventory } = this.props;
    if(!inventory || !inventory.chartData || !inventory.chartData.timelineData) return null;
    const domain = [ moment(inventory.startDate).valueOf(), moment(inventory.endDate).valueOf() ];
    const { monthlyXTickValues, data } = inventory.chartData.timelineData;

    return (
      <ResponsiveContainer width={width} height={height-this.state.responsiveContainerWorkaround} debounce={0}>
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
          <CartesianGrid
            vertical={false}
            stroke="#DDD"
            strokeWidth={1}
            strokeDasharray="3 6"
            yAxisId="emissions" // does not work, relies instead on order that y-axes appear in this component
          />
          {this.renderReferenceLines()}

          <XAxis
            dataKey="date"
            type="number"
            scale="time"
            ticks={monthlyXTickValues}
            domain={domain}
            tickFormatter={t => moment(t).format('MMM')}
            padding={{ left: 10, right: 0 }}
            axisLine={false}
            tickLine={false}
            allowDataOverflow={true}
          />

          <YAxis
            type="number"
            yAxisId="emissions"
            orientation="right"
            axisLine={{strokeWidth: 1, stroke: '#DDD'}}
            tickLine={{strokeWidth: 1, stroke: '#DDD'}}
            tick={{fill: '#888'}}
          >
            <Label angle={270} position='insideLeft' fill="#888" style={{ textAnchor: 'middle' }} offset={60}>
              Emissions kg/day
            </Label>
          </YAxis>

          <YAxis
            type="category"
            padding={{ top: 20, bottom: 20 }}
            scale="point" // workaround for vertical offset from lines
            axisLine={false}
            tickLine={false}
            yAxisId="activities"
            tick={<CustomActivityTick />}
            width={80}
          />

          <Tooltip cursor={false} active={!!this.state.activeRecord} content={<ChartTooltip record={this.state.activeRecord}/>}/>

          {this.renderAreas()}
          {this.renderLines()}
        </ComposedChart>
      </ResponsiveContainer>
    )
  }
}

InventoryTimeline.defaultProps = {
  width: '100%',
  height: 200,
}

registerComponent('InventoryTimeline', InventoryTimeline);
