import moment from 'moment';
import factors from './factors.js';
import { ActivityRecords } from '../ActivityRecords';

const { Utils } = ActivityRecords;
const { convertToBaseUnits } = Utils;

const findFactor = (activity, units, startDate, endDate) => {

  return factors.find((factor) => {
    if(factor.activity !== activity) return false;
    if(factor.units.toLowerCase() !== units.toLowerCase()) return false;
    if( !moment(startDate).isBetween(factor.startDate, factor.endDate, null, '[]') &&
        !moment(endDate).isBetween(factor.startDate, factor.endDate, null, '[]'))
        return false;

    return true;
  });
}

export const EmissionFactors = {

  calcCo2e: (activityRecord) => {
    const { activity } = activityRecord;

    switch (activity) {
      case 'electricity': return calcCo2eElectricity(activityRecord);
      case 'natural-gas': return calcCo2eNaturalGas(activityRecord);
      case 'vehicle': return calcCo2eVehicle(activityRecord);
      case 'propane': return calcCo2ePropane(activityRecord);
      case 'flight': return calcCo2eFlight(activityRecord);
      case 'heating-oil': return calcCo2eHeatingOil(activityRecord);
      default:
        console.error(`Trying to calculate CO2e for unrecognized activity ${activity} with data:`, activity.data);
        return 0;
    }
  }
}

/********************************************************************************************************/
/* Electricity
/********************************************************************************************************/
const calcCo2eElectricity = (activityRecord) => {
  const { activity, data } = activityRecord;
  if(!data || !data.energy || !data.units){
    console.error('Malformed electricity record, bad data.');
    return 0;
  }
  const factor = findFactor('electricity', data.units, activityRecord.startDate, activityRecord.endDate);

  if(!factor) {
    console.error(`Could not find emission factor for activity ${activity} with data:`, data);
    return 0;
  }

  return factor.factor * data.energy;
}

/********************************************************************************************************/
/* Vehicle
/********************************************************************************************************/
const calcCo2eVehicle = (activityRecord) => {
  const { activity, data } = activityRecord;
  if(!data){
    console.error('Malformed vehicle record, no data.');
    return 0;
  }
  const { type, units, distance, fuelVolume, fuelType, vehicleType, knownEfficiency, efficiencyUnits, efficiency } = data;

  // Convert all the values we might need to base units
  const basedDistance = convertToBaseUnits(distance, units);
  const basedFuelVolume = convertToBaseUnits(fuelVolume, units);
  let basedEfficiency;
  if(type === 'distance' && knownEfficiency === 'true')
    basedEfficiency = convertToBaseUnits(efficiency, efficiencyUnits);

  let factor;
  let ammount;

  if(type === 'fuel-volume'){

  }else if(type === 'distance'){
    let basedEfficiency;
    if(knownEfficiency === 'true'){
      basedEfficiency =
    }
  }else if(type === 'electric'){
    return 0;
  } else {
    console.error('Bad vehicle data type.');
    return 0;
  }
  const factor = findFactor(activityRecord, data.units);

  if(!factor) {
    console.error(`Could not find emission factor for activity ${activity} with data:`, data);
    return 0;
  }

  return factor.factor * amount;
}

/********************************************************************************************************/
/* Propane
/********************************************************************************************************/
const calcCo2ePropane = (activityRecord) => {
  const { activity, data } = activityRecord;
  if(!data){
    console.error('Malformed electricity record, no data.');
    return 0;
  }
  const factor = findFactor(activityRecord, data.units);

  if(!factor) {
    console.error(`Could not find emission factor for activity ${activity} with data:`, data);
    return 0;
  }

  return factor.factor * data.energy;
}

/********************************************************************************************************/
/* Heatin Oil
/********************************************************************************************************/
const calcCo2eHeatingOil = (activityRecord) => {
  const { activity, data } = activityRecord;
  if(!data){
    console.error('Malformed electricity record, no data.');
    return 0;
  }
  const factor = findFactor(activityRecord, data.units);

  if(!factor) {
    console.error(`Could not find emission factor for activity ${activity} with data:`, data);
    return 0;
  }

  return factor.factor * data.energy;
}

/********************************************************************************************************/
/* Flight
/********************************************************************************************************/
const calcCo2eFlight = (activityRecord) => {
  const { activity, data } = activityRecord;
  if(!data){
    console.error('Malformed electricity record, no data.');
    return 0;
  }
  const factor = findFactor(activityRecord, data.units);

  if(!factor) {
    console.error(`Could not find emission factor for activity ${activity} with data:`, data);
    return 0;
  }

  return factor.factor * data.energy;
}

/********************************************************************************************************/
/* Natural Gas
/********************************************************************************************************/
const calcCo2eNaturalGas = (activityRecord) => {
  const { activity, data } = activityRecord;
  if(!data){
    console.error('Malformed natural gas record, no data.');
    return 0;
  }
  const factor = findFactor('electricity', data.units, activityRecord.startDate, activityRecord.endDate);

  if(!factor) {
    console.error(`Could not find emission factor for activity ${activity} with data:`, data);
    return 0;
  }

  return factor.factor * data.energy;
}
