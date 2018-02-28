export const getAllowedActivities = () => {
  return [
    {value: 'electricity', text: 'Electricity'},
    {value: 'natural-gas', text: 'Natural Gas'},
    {value: 'flight', text: 'Flight'},
    {value: 'heat-oil', text: 'Heating Oil'},
    {value: 'vehicle', text: 'Vehicle'},
  ];
}

export const getAllowedActivityValues = () => {
  return getAllowedActivities().map((a) => {return a.value} );
}

export const activityValueToText = (value) => {
  const activity = getAllowedActivities().find((a)=>{return a.value === value});
  return activity?activity.text:'';
}
