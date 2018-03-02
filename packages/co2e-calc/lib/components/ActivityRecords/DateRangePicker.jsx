import React, { Component, PureComponent } from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { DateRangePicker as ReactDateRangePicker } from 'react-dates';
import moment from 'moment';

class DateRangePicker extends Component {
  state = {focusedInput: null}

  render() {
    const { startDate, endDate, handleChange, ...rest } = this.props;

    return (
      <ReactDateRangePicker
        {...rest}
        startDate={startDate?moment(startDate):null} // momentPropTypes.momentObj or null,
        startDateId="startDateId" // PropTypes.string.isRequired,
        endDate={endDate?moment(endDate):null} // momentPropTypes.momentObj or null,
        endDateId="endDateId" // PropTypes.string.isRequired,
        onDatesChange={(values) => handleChange(null, {type: 'airbnb-date-range-picker', names: ['startDate', 'endDate'], values})}
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        noBorder={true}
        showClearDates={true}
        transitionDuration={500}
        isOutsideRange={() => false}
      />
    );
  }
}

registerComponent('DateRangePicker', DateRangePicker);
