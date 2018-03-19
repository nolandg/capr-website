import moment from 'moment';
import factors from './factors.js';
import { convertToBaseUnits, findVehicleType, convertMassToVolume, convertUnits } from '../enumerations';

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

const factorNotFoundError = ({activity, data}) => {
  console.error(`Could not find emission factor for activity ${activity} with data:`, data);
}

/********************************************************************************************************/
/* Electricity
/********************************************************************************************************/
const calcCo2eElectricity = (record) => {
  const { data, startDate, endDate } = record;
  const units = 'kWh';
  const energy = convertUnits(data.energy, data.units, units);

  const factor = findFactor('electricity', units, startDate, endDate);
  if(!factor) {
    factorNotFoundError(record);
    return 0;
  }

  return factor.factor * energy;
}

/********************************************************************************************************/
/* Vehicle
/********************************************************************************************************/
const calcCo2eVehicle = (record) => {
  const { data, startDate, endDate } = record;
  const { type, units, fuelType, knownEfficiency, efficiencyUnits } = data;
  const vehicleType = findVehicleType(data.vehicleType);

  // Convert all the values we might need to base units
  const distance = convertToBaseUnits(data.distance, units);
  const fuelVolume = convertToBaseUnits(data.fuelVolume, units);
  let efficiency;
  if(type === 'distance'){
    if(knownEfficiency === 'true'){
      efficiency = convertToBaseUnits(efficiency, efficiencyUnits);
    }else{
      efficiency = vehicleType.efficiency;
    }
  }

  let factor;
  let liters;

  // find liters of fuel
  if(type === 'fuel-volume'){
    liters = fuelVolume;
  }else if(type === 'distance'){
    liters = efficiency * distance / 100; // divide by 100 because efficiency is in L/100 km
  }else if(type === 'electric'){
    liters = 0;
  } else {
    console.error('Bad vehicle data type.');
    return 0;
  }

  factor = findFactor(`vehicle.${fuelType}`, 'L', startDate, endDate);
  if(!factor) {
    factorNotFoundError(record);
    return 0;
  }

  return factor.factor * liters;
}

/********************************************************************************************************/
/* Propane
/********************************************************************************************************/
const calcCo2ePropane = (record) => {
  const { data, startDate, endDate } = record;

  let amount = convertToBaseUnits(data.amount, data.units);
  if(data.units.dimension === 'mass'){
    amount = convertMassToVolume(amount, 'propane');
  }

  const factor = findFactor('propane', 'L', startDate, endDate);
  if(!factor) {
    factorNotFoundError(record);
    return 0;
  }

  return factor.factor * amount;
}

/********************************************************************************************************/
/* Heating Oil
/********************************************************************************************************/
const calcCo2eHeatingOil = (record) => {
  const { data, startDate, endDate } = record;

  let amount = convertToBaseUnits(data.amount, data.units);
  if(data.units.dimension === 'mass'){
    amount = convertMassToVolume(amount, 'heating-oil');
  }

  const factor = findFactor('heating-oil', 'L', startDate, endDate);
  if(!factor) {
    factorNotFoundError(record);
    return 0;
  }

  return factor.factor * amount;
}

/********************************************************************************************************/
/* Flight
/********************************************************************************************************/
const calcCo2eFlight = (record) => {
  const { data, startDate, endDate } = record;

  let distance = convertToBaseUnits(data.distance, data.units);
  let length = 'med';
  if(distance < 463) length = 'short';
  else if(distance > 1108) length = 'long';

  const factor = findFactor(`flight.${length}`, 'km', startDate, endDate);
  if(!factor) {
    factorNotFoundError(record);
    return 0;
  }

  return factor.factor * distance;
}

/********************************************************************************************************/
/* Natural Gas
/********************************************************************************************************/
const calcCo2eNaturalGas = (record) => {
  const { data, startDate, endDate } = record;
  const units = 'GJ';

  let energy = convertUnits(data.energy, data.units, units);

  const factor = findFactor('natural-gas', units, startDate, endDate);
  if(!factor) {
    factorNotFoundError(record);
    return 0;
  }

  return factor.factor * energy;
}
