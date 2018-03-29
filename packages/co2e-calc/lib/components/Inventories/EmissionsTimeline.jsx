import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Area, CartesianGrid, Label, Tooltip } from 'recharts';
import { ActivityTooltip } from './Tooltips';
import moment from 'moment';

/**********************************************************************************/
/* InventoryTimeline
/**********************************************************************************/
class EmissionsTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responsiveContainerWorkaround: 1,
      activeSeries: null,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({responsiveContainerWorkaround: 0});
    }, 3000);
  }

  renderAreas = () => {
    const timelineData = this.props.inventory.chartData.timelineData;

    return timelineData.emissionsSeriesNames.map((seriesName) => {
      const isActive = this.state.activeSeries === seriesName;
      const fill =  ActivityRecords.Utils.activityToColor(seriesName, isActive?'active':null);

      return (
        <Area dataKey={seriesName} stackId="1" yAxisId="emissions" type="monotone" key={seriesName}
          activeDot={false} connectNulls={true}
          stroke="white" strokeWidth={4}
          fill={fill} fillOpacity={1}
          onMouseEnter={() => { this.setState({activeSeries: seriesName}) }}
          onMouseLeave={() => { this.setState({activeSeries: null}) }}
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
            stroke="#AAA"
            strokeWidth={1}
            strokeDasharray="3 6"
          />

          <XAxis
            dataKey="date"
            type="number"
            scale="time"
            ticks={monthlyXTickValues}
            domain={domain}
            tickFormatter={t => moment(t).format('MMM')}
            padding={{ left: 0, right: 0 }}
            axisLine={false}
            tickLine={false}
            allowDataOverflow={true}
          />

          <YAxis
            type="number"
            yAxisId="emissions"
            orientation="left"
            axisLine={{strokeWidth: 1, stroke: '#DDD'}}
            tickLine={{strokeWidth: 1, stroke: '#DDD'}}
            tick={{fill: '#888'}}
          >
            <Label angle={270} position='insideLeft' fill="#444" style={{ textAnchor: 'middle' }} offset={0}>
              Emissions in kg/day
            </Label>
          </YAxis>

          <Tooltip cursor={true} content={<ActivityTooltip seriesName={this.state.activeSeries} inventory={inventory} />}/>

          {this.renderAreas()}
        </ComposedChart>
      </ResponsiveContainer>
    )
  }
}

EmissionsTimeline.defaultProps = {
  width: '100%',
  height: 200,
}

registerComponent('EmissionsTimeline', EmissionsTimeline);
