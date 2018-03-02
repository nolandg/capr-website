import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import moment from 'moment';

class ActivityCompletion extends Component {

  render(){
    const { width = '100%', height = 200 } = this.props;
    const data = [{name: 'completed', value: 70}, {name: 'not-completed', value: 30}];

    return (
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie data={data} innerRadius="50%" outerRadius="100%" />
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

registerComponent('ActivityCompletion', ActivityCompletion);
