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

    {value: 'kg', text: 'Killograms', dimension: 'mass', contexts: [] },
    {value: 'lbs', text: 'Pounds', dimension: 'mass', contexts: [] },
  ];
}

export const getFuelTypes = () => {
  return [
    {value: 'gasoline', text: 'Gasoline'},
    {value: 'diesel', text: 'Diesel'},
    {value: 'propane', text: 'Propane'},
    {value: 'vegtable-oil', text: 'Vegtable oil'},
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

export const getAllowedUnitsValues = () => {
  return getAllowedUnits().map((a) => {return a.value} );
}

export const getUnitsForContext = (context) => {
  return getAllowedUnits().filter((unit) => { return unit.contexts.indexOf(context) !== -1} );
}

export const getAllowedActivityValues = () => {
  return getAllowedActivities().map((activity) => {return activity.value} );
}

export const activityValueToText = (value) => {
  const activity = getAllowedActivities().find((a)=>{return a.value === value});
  return activity?activity.text:'';
}

export const fuelTypeValueToText = (value) => {
  const fuel = getFuelTypes().find((f)=>{return f.value === value});
  return fuel?fuel.text:'';
}
