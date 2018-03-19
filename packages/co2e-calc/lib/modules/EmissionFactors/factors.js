import moment from 'moment';

// Source: https://www2.gov.bc.ca/assets/gov/environment/climate-change/cng/methodology/2016-17-pso-methodology.pdf
module.exports = [
  {
    activity: 'electricity',
    units: 'kWh',
    factor: .01067,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'natural-gas',
    units: 'GJ',
    factor: 49.87,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'vehicle.gasoline',
    units: 'L',
    factor: 2.346,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'vehicle.diesel',
    units: 'L',
    factor: 2.649,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'vehicle.vegtable-oil',
    units: 'L',
    factor: 0,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'vehicle.propane',
    units: 'L',
    factor: 1.534,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'propane',
    units: 'L',
    factor: 1.548,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'heating-oil',
    units: 'L',
    factor: 2.653,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'flight.short',
    units: 'km',
    factor: 0.1576,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'flight.medium',
    units: 'km',
    factor: 0.0897,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
  {
    activity: 'flight.long',
    units: 'km',
    factor: 0.1048,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  },
];
