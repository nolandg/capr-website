import { Components, registerComponent, withList } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { ActivityRecords } from '../../modules/ActivityRecords/index.js';
import moment from 'moment';
// import { Inventories } from '../../modules/Inventories';
import { compose } from 'redux';

export default function withInventoryData(WrappedComponent) {
  return class extends Component {

    constructor(props){
      super(props);

      if(!props.loading){
        this.state = this.getUpdatedData(props.results);
      }else{
        this.state = {
          recordsHash: null,
          timelineData: null,
        }
      }
    }

    massageTimelineData = (records) => {
      records = records.filter((record) => {
        return moment(record.startDate).isBetween(this.props.startDate, this.props.endDate, null, '[]') ||
               moment(record.endDate).isBetween(this.props.startDate, this.props.endDate, null, '[]');
      });

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

      return {
        data, activitySeriesNames, emissionsSeriesNames, activityYValues,
        monthlyXTickValues: this.generateMonthlyXTickValues()
      };
    }

    getUpdatedData = (records) => {
      return {
        recordsHash: ActivityRecords.Utils.hashRecords(records),
        timelineData: this.massageTimelineData(records),
      };
    }

    updateData = (records) => {
      this.setState(this.getUpdatedData());
    }

    generateMonthlyXTickValues = () => {
      const year = this.props.startDate.year();

      return [1,2,3,4,5,6,7,8,9,10,11,12].map((m)=>{1
        return moment().year(year).month(m).day(1).valueOf();
      });
    }

    componentWillReceiveProps = (nextProps) => {
      const nextRecordsHash = ActivityRecords.Utils.hashRecords(nextProps.results);

      if(nextRecordsHash !== this.state.recordsHash){
        this.updateData(nextProps.results);
      }
    }

    render() {
      if(this.props.loading) return <Loader />
      return <WrappedComponent {...this.props} timelineData={this.state.timelineData} />;
    }
  }
}
