import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';
import moment from 'moment';

const colors = {
  red: '#db2828',
  orange: '#f2711c',
  yellow: '#fbbd08',
  olive: '#b5cc18',
  green: '#21ba45',
  teal: '#00b5ad',
  blue: '#2185d0',
  violet: '#6435c9',
  purple: '#a333c8',
  pink: '#e03997',
  brown: '#a5673f',
  grey: '#767676',
  black: '#1b1c1d',
};

const seriesColors = [
  colors.orange,
  colors.pink,
  colors.blue,
  colors.yellow,
  colors.green,
  colors.violet,
  colors.teal,
  colors.olive,
  colors.brown,
]

class InventoryTimeline extends Component {
  getMassagedData = (records) => {
    const data = [];
    const series = {};

    records.forEach((record) => {
      if(!series[record.activity]) series[record.activity] = [];
      const seriesName = record.activity + '.' + series[record.activity].length;
      const seriesText = ActivityRecords.activityValueToText(record.activity);

      series[record.activity].push(seriesName);

      data.push({[seriesName]: seriesText, date: new Date(record.startDate).valueOf()});
      data.push({[seriesName]: seriesText, date: new Date(record.endDate).valueOf()});
    });

    return {series, data};
  }

  renderLines = (series) => {
    const lines = [];
    const dot = {strokeWidth: 4, r: 8};
    const strokeWidth = 20;
    let activityIndex = 0;

    for(let activity in series){
      series[activity].forEach((seriesName) => {
        const stroke = seriesColors[activityIndex];

        lines.push(<Line dot={dot} dataKey={seriesName} key={seriesName + '__lines'} stroke={stroke} strokeWidth={strokeWidth} />);
      });

      activityIndex++;
    }

    return lines;
  }

  render(){
    const { width = '100%', height = 200 } = this.props;

    const domain = [
      moment('2018-01-01').valueOf(),
      moment('2018-12-01').valueOf(),
    ];
    const tickFormatter = (tick) => {
      return moment(tick).format('MMM');
    };
    const ticks = [1,2,3,4,5,6,7,8,9,10,11,12].map((m)=>{
      return moment('2018-' + m + '-01', 'YYYY-M-DD');
    });

    const {data, series} = this.getMassagedData(this.props.activityRecords);

    return (
      <ResponsiveContainer width={width} height={height}>
        <LineChart data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date"
            type="number"
            scale="time"
            ticks={ticks}
            domain={domain}
            tickFormatter={tickFormatter}
            padding={{ left: 0, right: 20 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            padding={{ top: 20, bottom: 20 }}
            axisLine={false}
            tickLine={false}
          />
          <CartesianGrid strokeDasharray="3 5"  horizontal={false}/>
          <Tooltip />

          {this.renderLines(series)}
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

registerComponent('InventoryTimeline', InventoryTimeline);
