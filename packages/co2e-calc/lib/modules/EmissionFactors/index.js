import moment from 'moment';

const emissionFactors = [
  {
    activity: 'electricity',
    units: 'kWh',
    factor: .000011,
    startDate: moment('1970', 'YYYY'),
    endDate: moment('2050', 'YYYY'),
  }
];

const findFactor = (activityRecord, units) => {
  const { activity } = activityRecord;

  return emissionFactors.find((factor) => {
    if(factor.activity !== activity) return false;
    if(factor.units.toLowerCase() !== units.toLowerCase()) return false;
    if( !moment(activityRecord.startDate).isBetween(factor.startDate, factor.endDate, null, '[]') &&
        !moment(activityRecord.endDate).isBetween(factor.startDate, factor.endDate, null, '[]'))
        return false;

    return true;
  });
}

export const EmissionFactors = {

  calcCo2e: (activityRecord) => {
    const { activity } = activityRecord;

    switch (activity) {
      case 'electricity': return calcCo2eElectricity(activityRecord);
      default:
        console.error(`Trying to calculate CO2e for unrecognized activity ${activity} with data:`, activity.data);
        return 0;
    }
  }
}

const calcCo2eElectricity = (activityRecord) => {
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

  return factor.factor * data.value;
}
