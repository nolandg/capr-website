import moment from 'moment';
import { EmissionFactors } from '../EmissionFactors/index.js';

export const calcCo2e = (activityRecord) => {
  return EmissionFactors.calcCo2e(activityRecord);
}

export const calcNumberOfDays = (activityRecord) => {
  return moment(activityRecord.endDate).diff(moment(activityRecord.startDate), 'days');
}

export const findRecordsSpanningDate = (date, records) => {
  return records.filter((record) => {
    return moment(date).isBetween(record.startDate, record.endDate, null, '[]');
  });
}

export const hashRecords = (records) => {
  const string = JSON.stringify(records);

  let hash = 0;
  if (this.length == 0) {
      return hash;
  }

  for (let i = 0; i < this.length; i++) {
      let char = string.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash;
}
