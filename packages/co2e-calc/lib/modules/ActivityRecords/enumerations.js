const colors = require('color');

export const getAllowedActivities = () => {
  return [
    {value: 'electricity', text: 'Electricity'},
    {value: 'natural-gas', text: 'Natural Gas'},
    {value: 'flight', text: 'Flight'},
    {value: 'heat-oil', text: 'Heating Oil'},
    {value: 'vehicle', text: 'Vehicle'},
    {value: 'propane', text: 'Propane'},
  ];
}

export const getAllowedUnits = () => {
  return [
    {value: 'kWh', text: 'Killowatt Hours', dimension: 'energy', contexts: ['electricity'] },
    {value: 'GJ', text: 'Gigajoules', dimension: 'energy', contexts: ['natural-gas']  },

    {value: 'L', text: 'Litres', dimension: 'volume', contexts: ['vehicle.fuel-volume'] },
    {value: 'US gal', text: 'US Gallons', dimension: 'volume', contexts: ['vehicle.fuel-volume'] },

    {value: 'km', text: 'Killometers', dimension: 'distance', contexts: ['vehicle.distance'] },
    {value: 'mi', text: 'Miles', dimension: 'distance', contexts: ['vehicle.distance'] },

    {value: 'L/100-km', text: 'Liters per 100km', dimension: 'volume/distance', contexts: ['vehicle.efficiency'] },
    {value: 'mi/gal', text: 'Miles per gallon', dimension: 'distance/volume', contexts: ['vehicle.efficiency'] },

    {value: 'kg', text: 'Killograms', dimension: 'mass', contexts: [] },
    {value: 'lbs', text: 'Pounds', dimension: 'mass', contexts: [] },
  ];
}

export const getVehicleTypes = () => {
  return [
    {value: 'motorcycle', text: 'Motocycle', efficiency: 123, efficiencyUnits: 'L/100-km'},
    {value: 'small-car', text: 'Small car', efficiency: 123, efficiencyUnits: 'L/100-km'},
    {value: 'large-car', text: 'Large car', efficiency: 123, efficiencyUnits: 'L/100-km'},
    {value: 'suv', text: 'SUV', efficiency: 123, efficiencyUnits: 'L/100-km'},
    {value: 'truck', text: 'Truck', efficiency: 123, efficiencyUnits: 'L/100-km'},
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

export const activityToIcon = (activity) => {
  switch (activity) {
    case 'electricity': return 'bc-hydro';
    case 'vehicle': return 'car';
    case 'natural-gas': return 'fortis';
    case 'flight': return 'plane';
    case 'propane': return 'propane';
    default: return '';
  }
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
  return getAllowedUnits().filter(unit => unit.contexts.indexOf(context) !== -1 );
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
