import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Line, ReferenceLine, Area, CartesianGrid, Label } from 'recharts';
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
  state = {
    activeRecord: null,
  }

  cachedMassagedData = {
    data: null,
    recordsJson: null,
  }

  constructor(props) {
    super(props);

    const records = props.activityRecords;

    this.state = {
      ...this.massageData(records),
      xTickValues: this.generateXTickValues(),
      responsiveContainerWorkaround: 1,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({responsiveContainerWorkaround: 0});
    }, 3000);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      xTickValues: this.generateXTickValues(),
    });
  }

  massageData = (records) => {
    const data = [];
    const activitySeriesNames = [];
    let activityYValues = [];
    let dates = [];

    // Sort records from longest duration to shortest to ensure short ones
    // show up on top
    const recordsSortedByDuration = [...records].sort((a, b) => {
      return b.dayCount - a.dayCount;
    });

    //***** Activities *****//
    // Create short lines representing time spans covered by each record
    // Lines of for the same activity value have the same y (category) value
    // 'date' is the x value
    recordsSortedByDuration.forEach((record) => {
      // Name this series based on its record id which should be unique
      const seriesName = record._id;
      // The y value is on a category axis. The activity name will be translated to text by the tick formatter
      const yValue = record.activity;

      // Add the start and end point of this line (which is the entire series) to the data used by Recharts/D3
      const startOfSeriesDataPoint = {[seriesName]: yValue, date: new Date(record.startDate).valueOf()};
      const endOfSeriesDataPoint = {[seriesName]: yValue, date: new Date(record.endDate).valueOf()};
      data.push(startOfSeriesDataPoint);
      data.push(endOfSeriesDataPoint);

      // We need to keep track of which series name was created in data for which record
      // so we can make line components for them late
      activitySeriesNames.push({
        seriesName,
        record,
      });

      // Keep track of all the unique y values so we can add grid lines etc. later
      activityYValues = [...new Set([...activityYValues, yValue])];

      // Keep track of each start and end date for emissions to use below
      dates.push(record.startDate);
      dates.push(record.endDate);
    });

    //***** Emissions *****//
    // Create a stacked area chart for emissions per day for each activity
    let emissionsSeriesNames = [];

    // Add extra dates before and after each start and end date of these records
    // Emissions will also be calculated on these dates to smooth the interpolation
    dates.forEach((date) => {
      dates.push(moment(date).subtract(5, 'days').toISOString())
      dates.push(moment(date).add(5, 'days').toISOString());
    });

    // Sort all the start and end dates for all records from earliest to latest
    dates.sort((a, b) => {
      if(moment(a).isBefore(b)) return -1;
      if(moment(a).isSame(b)) return 0;
      else return 1;
    });

    // Create a stacked area data point for each date
    // 'date' is the x value
    dates.forEach((date) => {
      const co2eTotals = ActivityRecords.Utils.calcTotalCo2eForEachActivityOnDate(records, date);

      data.push({
        date: moment(date).valueOf(),
        ...co2eTotals,
      });

      // Track all the series names created so we can make areas for them later
      emissionsSeriesNames = [...new Set([...emissionsSeriesNames, ...Object.keys(co2eTotals)])];
    });

    return {data, activitySeriesNames, emissionsSeriesNames, activityYValues};
  }

  generateXTickValues = () => {
    const year = this.props.startDate.year();

    return [1,2,3,4,5,6,7,8,9,10,11,12].map((m)=>{1
      return moment(year + '-' + m + '-01', 'YYYY-M-DD').valueOf();
    });
  }

  renderReferenceLines = () => {
    const { activityYValues, xTickValues } = this.state;

    const verticalLines = xTickValues.map((x) => { return (
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
    const { activitySeriesNames } = this.state;
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
    return this.state.emissionsSeriesNames.map((seriesName) => {
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
    const { width, height, startDate, endDate } = this.props;
    const domain = [ moment(startDate).valueOf(), moment(endDate).valueOf() ];
    const { xTickValues, data } = this.state;

    return (
      <ResponsiveContainer width={width} height={height-this.state.responsiveContainerWorkaround} debounce={0}>
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
          <CartesianGrid
            vertical={false}
            stroke="#DDD"
            strokeWidth={1}
            strokeDasharray="3 6"
            yAxisId="emissions" // does not work
          />
          {this.renderReferenceLines()}

          <XAxis
            dataKey="date"
            type="number"
            scale="time"
            ticks={xTickValues}
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

          <Tooltip cursor={false} active={!!this.state.activeRecord} content={<CustomTooltip record={this.state.activeRecord}/>}/>

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
