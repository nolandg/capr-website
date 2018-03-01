export const getAllowedActivities = () => {
  return [
    {value: 'electricity', text: 'Electricity'},
    {value: 'natural-gas', text: 'Natural Gas'},
    {value: 'flight', text: 'Flight'},
    {value: 'heat-oil', text: 'Heating Oil'},
    {value: 'vehicle', text: 'Vehicle'},
  ];
}

export const getAllowedUnits = () => {
  return [
    {value: 'kWh', label: 'Killowatt Hours', dimension: 'energy' },
    {value: 'GJ', label: 'Gigajoules', dimension: 'energy' },

    {value: 'L', label: 'Litres', dimension: 'volume' },
    {value: 'US gal', label: 'US Gallons', dimension: 'volume' },

    {value: 'km', label: 'Killometers', dimension: 'distance' },
    {value: 'mi', label: 'Miles', dimension: 'distance' },

    {value: 'kg', label: 'Killograms', dimension: 'mass' },
    {value: 'lbs', label: 'Pounds', dimension: 'mass' },
  ];
}

export const getAllowedUnitsValues = () => {
  return getAllowedUnits().map((a) => {return a.value} );
}

export const getAllowedActivityValues = () => {
  return getAllowedActivities().map((a) => {return a.value} );
}

export const activityValueToText = (value) => {
  const activity = getAllowedActivities().find((a)=>{return a.value === value});
  return activity?activity.text:'';
}
