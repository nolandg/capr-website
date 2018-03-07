import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { EmissionFactors } from '../../modules/EmissionFactors/index.js';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Line, ReferenceLine, Area } from 'recharts';
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

  constructor(props) {
    super(props);

    const records = props.activityRecords;

    this.state = {
      ...this.massageData(records),
      recordsHash: ActivityRecords.Utils.hashRecords(records),
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
    const records = nextProps.activityRecords;
    let remassageData = false;

    if(!nextProps.startDate.isSame(this.props.startDate)) remassageData = true;
    else if(nextProps.endDate.isSame(this.props.endDate)) remassageData = true;
    else {
      const nextRecordsHash = ActivityRecords.Utils.hashRecords(records);
      if(this.state.recordsHash !== nextRecordsHash) remassageData = true;
    }

    if(1 || remassageData){
      this.setState({
        ...this.massageData(records),
        recordsHash: ActivityRecords.Utils.hashRecords(records),
        xTickValues: this.generateXTickValues(),
      });
    }
  }

  massageData = (records) => {
    const data = [];
    const activitySeriesNames = [];
    let activityYValues = [];

    const dates = [];

    //***** Activities *****//
    // Create short lines representing time spans covered by each record
    // Lines of for the same activity value have the same y (category) value
    // 'date' is the x value
    records.forEach((record) => {
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
      dates.push({ date: record.startDate, type: 'start', record });
      dates.push({ date: record.endDate, type: 'end', record });
    });

    //***** Emissions *****//
    // Create a stacked area chart for emissions per day for each activity
    let emissionsSeriesNames = [];

    // Sort all the start and end dates for all records from earliest to latest
    const sortedDates = [...dates].sort((a, b) => {
      if(moment(a.date).isBefore(b.date)) return -1;
      if(moment(a.date).isSame(b.date)) return 0;
      else return 1;
    })

    // Create a stacked area data point for each date
    // 'date' is the x value
    sortedDates.forEach((date) => {
      // For every x values we must include all records that are also happening at the same time
      const simultaneousRecords = ActivityRecords.Utils.findRecordsSpanningDate(date.date, records);
      const newDataPoint = {
        date: moment(date.date).valueOf(), // all series at this point share this x value
      };
      // Track how many simultaneous records are for the same activity
      let sameActivityCount = 0;

      simultaneousRecords.forEach((record) => {
        const seriesName = record.activity;
        // Find the CO2e per day in kg
        const co2ePerDay = EmissionFactors.calcCo2e(record)*1000/record.dayCount;

        if(record.activity === date.record.activity) sameActivityCount++;

        newDataPoint[seriesName] = co2ePerDay;

        // Track all the series names created so we can make areas for them later
        emissionsSeriesNames = [...new Set([...emissionsSeriesNames, seriesName])];
      });

      data.push(newDataPoint);

      // To make the step interpolation look good we need to add a point with zero y value
      // immediately after a record finishes if there's no other simultaneous records of that activity type
      // Otherwise the graph doesn't go to zero until then next data point
      // All other series retain their same value
      if((sameActivityCount === 1) && date.type === 'end'){
        const seriesName = date.record.activity;
        data.push({...newDataPoint, date: moment(date.date).add(1, 'seconds').valueOf(), [seriesName]: 0});
      }
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

    const horizontalLines = activityYValues.map((y) => { return (
      <ReferenceLine key={y + '__y-reference-line'} y={y} stroke="#DDD" strokeWidth="1" strokeDasharray="3 0" yAxisId="activities"/>
    )});

    const verticalLines = xTickValues.map((x) => { return (
      <ReferenceLine key={x + '__x-reference-line'} x={x} stroke="#DDD" strokeWidth="1" strokeDasharray="3 3"/>
    )});

    return [
      ...horizontalLines,
      ...verticalLines,
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
        <Area dataKey={seriesName} stackId="1" yAxisId="emissions" type="stepAfter" key={seriesName}
          activeDot={false}
          stroke={stroke} strokeWidth="0"
          fill={fill}
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
          <XAxis dataKey="date"
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

          {this.renderReferenceLines()}
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
