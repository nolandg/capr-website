import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class MyInventories extends Component {

  getMassagedData = (records) => {
    const data = records.map((record) => {
      return 1;
    });
  }

  render(){
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    ];

    const data2 = this.getMassagedData(this.props.results);

    return (
      <div>
        <Divider hidden />
        {/* <Header as="h1">Y</Header> */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name"/>
            <Tooltip />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            <Bar dataKey="amt" stackId="a" fill="#FF0000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

registerComponent('MyInventories', MyInventories, [withList, {
  collection: ActivityRecords,
  queryName: 'activityRecordsList',
  fragmentName: 'AcivityRecordsList',
}]);
