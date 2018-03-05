import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import moment from 'moment';

function CustomizedLabel({viewBox, percent}){
  return (
    <g>
      <text x={viewBox.cx} y={viewBox.cy} fontSize={40} textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
        {percent}%
      </text>
      <text x={viewBox.cx} y={viewBox.cy+15} fontSize={16} textAnchor="middle" dominantBaseline="hanging" fill="#888" >
        complete
      </text>
    </g>
  );
}

class ActivityCompletion extends Component {

  getPercent = (records) => {
    let days = [];

    records.forEach((record) => {
      const newDays = this.getListOfDays(record.startDate, record.endDate);
      days = [...new Set([...days,...newDays])];
    });

    let percent = Math.ceil(days.length/365*100);
    return percent;
  }

  getListOfDays = (startDate, endDate) => {
    const days = [];

    for(let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
      days.push(m.dayOfYear());
    }

    return days;
  }

  render(){
    const { width = '100%', height = 200, activityFilter, activityRecords } = this.props;
    let records = activityRecords;
    if(activityFilter) records = records.filter((record) => {return record.activity === activityFilter});

    const percent = this.getPercent(records);
    const data = [{name: 'completed', value: percent}, {name: 'not-completed', value: 100-percent}];


    return (
      <div>
        <ResponsiveContainer width={width} height={height} className="completion-pie">
          <PieChart>
            <Pie data={data}
              innerRadius="50%"
              outerRadius="100%"
              dataKey="value"
              paddingAngle={1}
              startAngle={450}
              endAngle={90}
              >
              {data.map((entry, index) => {
                let color;
                if(entry.name === 'completed') color = '#21ba45';
                else color = '#CCCCCC';

                return <Cell fill={color} key={index} />
              })}

              <Label position="center" content={<CustomizedLabel percent={percent}/>} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

registerComponent('ActivityCompletion', ActivityCompletion);
