const colors = require('color');

export const getAllowedActivities = () => {
  return [
    {value: 'electricity', text: 'Electricity'},
    {value: 'natural-gas', text: 'Natural Gas'},
    {value: 'flight', text: 'Flight'},
    {value: 'heating-oil', text: 'Heating Oil'},
    {value: 'vehicle', text: 'Vehicle'},
    {value: 'propane', text: 'Propane'},
  ];
}

export const getAllowedUnits = () => {
  return [
    // Energy
    {value: 'kWh', text: 'Killowatt Hours', toBase: 1, dimension: 'energy', contexts: ['electricity'] },
    {value: 'GJ', text: 'Gigajoules', toBase: .0036, dimension: 'energy', contexts: ['natural-gas']  },

    // Volume
    {value: 'L', text: 'Litres', toBase: 1, dimension: 'volume', contexts: ['vehicle.fuel-volume', 'propane', 'heating-oil'] },
    {value: 'US gal', text: 'US Gallons', toBase: 0.264172, dimension: 'volume', contexts: ['vehicle.fuel-volume', 'propane', 'heating-oil'] },

    // Distance
    {value: 'km', text: 'Killometers', toBase: 1, dimension: 'distance', contexts: ['vehicle.distance', 'flight.distance'] },
    {value: 'mi', text: 'Miles', toBase: 0.621371, dimension: 'distance', contexts: ['vehicle.distance'] },

    // Fuel efficiency
    {value: 'L/100-km', text: 'Liters per 100km', toBase: 1, dimension: 'volume/distance', contexts: ['vehicle.efficiency'] },
    {value: 'mi/gal', text: 'Miles per gallon', toBase: 235.215, dimension: 'distance/volume', contexts: ['vehicle.efficiency'] },

    // Mass/force
    {value: 'kg', text: 'Killograms', toBase: 1, dimension: 'mass', contexts: ['propane', 'heating-oil'] },
    {value: 'lbs', text: 'Pounds', toBase: 2.20462, dimension: 'mass', contexts: ['propane', 'heating-oil'] },
  ];
}

export const getVehicleTypes = () => {
  return [
    {value: 'motorcycle', text: 'Motocycle', efficiency: 3, efficiencyUnits: 'L/100-km'},
    {value: 'small-car', text: 'Small car', efficiency: 7, efficiencyUnits: 'L/100-km'},
    {value: 'large-car', text: 'Large car', efficiency: 10, efficiencyUnits: 'L/100-km'},
    {value: 'suv', text: 'SUV', efficiency: 15, efficiencyUnits: 'L/100-km'},
    {value: 'truck', text: 'Truck', efficiency: 18, efficiencyUnits: 'L/100-km'},
  ];
}

export const getFuelTypes = () => {
  return [
    {value: 'gasoline', text: 'Gasoline'},
    {value: 'diesel', text: 'Diesel'},
    {value: 'propane', text: 'Propane'},
    {value: 'vegtable-oil', text: 'Vegtable oil'},
    {value: 'electricity', text: 'Electricity'},
  ];
}

export const convertMassToVolume = (mass, substance) => {
  let density; // in L/kg
  switch (substance) {
    case 'propane': density = 1.9825; break;
    case 'heating-oil': density = 1.1547; break;
  }
  if(!density){
    console.error(`Trying to convert mass to volume for unknown substance ${substance}.`);
    return 0;
  }
  return mass * density;
}

const palet = { red: '#db2828', orange: '#f2711c', yellow: '#fbbd08', olive: '#b5cc18', green: '#21ba45', teal: '#00b5ad', blue: '#2185d0', violet: '#6435c9', purple: '#a333c8', pink: '#e03997', brown: '#a5673f', grey: '#767676', black: '#1b1c1d',};

const orderedPalet= [
  palet.orange,
  palet.pink,
  palet.blue,
  palet.yellow,
  palet.green,
  palet.violet,
  palet.teal,
  palet.olive,
  palet.brown,
  palet.grey,
];
const defaultColor = '#767676';

export const findVehicleType = (value) => {
  return getVehicleTypes().find(v => v.value === value);
}

export const findUnits = (value) => {
  if(typeof value === 'object') return value;
  return getAllowedUnits().find(units => units.value.toLowerCase() === value.toLowerCase());
}

export const convertUnits = (value, fromUnits, toUnits) => {
  const from = findUnits(fromUnits);
  const to = findUnits(toUnits);

  if(!to) {
    console.error('Trying to convert to unknown units "' + toUnits + '"');
    return 0;
  }
  if(!from) {
    console.error('Trying to convert from unknown units "' + fromUnits + '"');
    return 0;
  }

  return value * from.toBase / to.toBase;
}

export const convertToBaseUnits = (value, fromUnits) => {
  if(typeof fromUnits === 'string') fromUnits = findUnits(fromUnits);
  if(!fromUnits){
    console.error(`Could not find units ${fromUnits} to convert to base.`);
    return 0;
  }
  const baseUnits = getAllowedUnits().find(units => (units.dimension === fromUnits.dimension) && (units.toBase === 1));
  if(!baseUnits){
    console.error(`Could not find base units for ${fromUnits.text}.`);
  }

  return convertUnits(value, fromUnits, baseUnits);
}

export const activityToIconClass = (activity) => {
  switch (activity) {
    case 'vehicle': return 'car';
    case 'electricity': return 'powerline';
    case 'flight': return 'plane';
    case 'heating-oil': return 'heating-oil';
    case 'propane': return 'propane';
    case 'natural-gas': return 'natural-gas';
    default:
      console.error(`Trying to return icon class for unknown activity ${activity}.`);
      return '';
  }
}

export const activityToColor = (activity, type) => {
  const index = getAllowedActivityValues().indexOf(activity);

  if(index === -1 || index >= orderedPalet.length){
    console.error('Could not find color for unknown activity "' + activity + '"');
    return defaultColor;
  }

  const color = orderedPalet[index];

  if(type === 'active') return colors(color).lighten(.2).rgb().string();
  if(type === 'faded') return colors(color).fade(.5).rgb().string();
  if(type === 'faded-stroke') return colors(color).fade(.4).rgb().string();

  return color;
}

export const getFuelTypeValues = () => {
  return getFuelTypes().map(fuel => fuel.value);
}

export const getVehicleTypeValues = () => {
  return getVehicleTypes().map(v => v.value);
}

export const getVehicleTypeOptions = () => {
  return getVehicleTypes().map(({value, text}) => {return {value, text}});
}

export const getAllowedUnitsValues = () => {
  return getAllowedUnits().map(a => a.value );
}

export const getUnitsForContext = (context) => {
  return getAllowedUnits().filter(u => u.contexts.indexOf(context) !== -1 )
    .map(({value, text}) => {return {value, text}});
}

export const getUnitValuesForContext = (context) => {
  return getUnitsForContext(context).map(unit => unit.value);
}

export const getAllowedActivityValues = () => {
  return getAllowedActivities().map(activity => activity.value );
}

export const activityValueToText = (value) => {
  const activity = getAllowedActivities().find(a =>  a.value === value);
  return activity?activity.text:'';
}

export const unitValueToText = (value) => {
  const units = getAllowedUnits().find(u =>  u.value === value);
  return units?units.text:'';
}

export const vehicleTypeValueToText = (value) => {
  const vehicle = getAllowedUnits().find(v =>  v.value === value);
  return vehicle?vehicle.text:'';
}

export const vehicleTypeValueToEfficiencyString = (value) => {
  const vehicle = getVehicleTypes().find(v =>  v.value === value);
  return vehicle?`${vehicle.text} at ${vehicle.efficiency}${vehicle.efficiencyUnits}`:'';
}

export const fuelTypeValueToText = (value) => {
  const fuel = getFuelTypes().find(f => f.value === value);
  return fuel?fuel.text:'';
}
