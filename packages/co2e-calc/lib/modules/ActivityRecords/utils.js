import moment from 'moment';
import { EmissionFactors } from '../EmissionFactors';
import Utils from '../enumerations.js';

export const calcCo2e = (activityRecord) => {
  return EmissionFactors.calcCo2e(activityRecord);
}

export const calcNumberOfDays = (activityRecord) => {
  return moment(activityRecord.endDate).diff(moment(activityRecord.startDate), 'days');
}

const getDefaultDescription = (record) => {
  if((typeof record.co2e !== 'number') || (typeof record.dayCount !== 'number')) return '';
  else return `${Math.round(record.co2e)} kg emitted over ${record.dayCount} days`;
}

export const getDescription = (record) => {
  const data = record.data;
  let str = '';

  switch(record.activity){
    case 'vehicle':
      const fuel = Utils.fuelTypeValueToText(data.fuelType).toLowerCase();
      if(data.type === 'electric'){
        str = 'Yay for electric vehicles!';
      }else if(data.type === 'fuel-volume'){
        str = `${data.fuelVolume} ${data.units} of ${fuel} burned`;
      }else if(data.type === 'distance'){
        if(data.knownEfficiency === 'true'){
          str = `${data.distance} ${data.units} driven at ${data.efficiency} ${data.efficiencyUnits} of ${fuel}`;
        }else{
          const vehicleType = Utils.vehicleTypeValueToEfficiencyString(data.vehicleType).toLowerCase();
          str = `${data.distance} ${data.units} driven in a ${vehicleType} of ${fuel}`;
        }
      }
      break;

    case 'flight':
      str = `${data.distance} km ${data.isRoundTrip === 'true'?'return':'one-way'} flight
        from ${data.flightOrigin.text} to ${data.flightDestination.text}`;
      break;

    case 'electricity':
      str = `${data.energy} ${data.units} of electricity consumed`;
      break;

    case 'natural-gas':
      str = `${data.energy} ${data.units} of natural gas burned`;
      break;

    case 'propane':
      str = `${data.amount} ${data.units} of propane burned`;
      break;

    case 'heating-oil':
      str = `${data.amount} ${data.units} of heating oil burned`;
      break;

    default:
      str = getDefaultDescription(record);
  }

  return str;
}
