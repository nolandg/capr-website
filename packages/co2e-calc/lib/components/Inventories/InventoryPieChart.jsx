import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ActivityPieTooltip } from './Tooltips';

/**********************************************************************************/
/* InventoryTimeline
/**********************************************************************************/
class InventoryPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responsiveContainerWorkaround: 1,
      activeIndex: null,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({responsiveContainerWorkaround: 0});
    }, 3000);
  }

  onPieEnter = (data, index) => {
    this.setState({ activeIndex: index });
  }
  onPieLeave = (data, index) => {
    this.setState({ activeIndex: null });
  }

  renderCell = (dataPoint, index) => {
    const isActive = this.state.activeIndex === index;
    const fill =  ActivityRecords.Utils.activityToColor(dataPoint.name, isActive?'active':null);

    return <Cell key={index} fill={fill} stroke="#FFF" strokeWidth={4} />
  }

  renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    const dataPoint = this.props.inventory.chartData.totals.data[index];
    const activity = dataPoint.name;
    const activityText = ActivityRecords.Utils.activityValueToText(activity);

    return (
      <text x={x} y={y} fill="#FFF" dominantBaseline="central" textAnchor="middle"
         fontSize="20px" fontWeight="bold">
        {activityText}
      </text>
    );
  };

  render(){
    const { activeIndex } = this.state;
    const { width, height, inventory } = this.props;
    if(!inventory || !inventory.chartData || !inventory.chartData.totals) return null;
    const data = inventory.chartData.totals.data;

    return (
      <ResponsiveContainer width={width} height={height-this.state.responsiveContainerWorkaround} debounce={0}>
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="100%" innerRadius="30%"
            activeIndex={activeIndex} onMouseEnter={this.onPieEnter} onMouseLeave={this.onPieLeave}
            label={this.renderLabel} labelLine={false}>
            {data.map(this.renderCell)}
          </Pie>
          <Tooltip cursor={false}
            content={<ActivityPieTooltip inventory={inventory} dataPoint={activeIndex !== null?data[activeIndex]:null} />}/>
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

InventoryPieChart.defaultProps = {
  width: '100%',
  height: 500,
}

registerComponent('InventoryPieChart', InventoryPieChart);
