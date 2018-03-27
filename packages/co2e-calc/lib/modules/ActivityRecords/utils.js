import moment from 'moment';
import { EmissionFactors } from '../EmissionFactors';

export const calcCo2e = (activityRecord) => {
  return EmissionFactors.calcCo2e(activityRecord);
}

export const calcNumberOfDays = (activityRecord) => {
  return moment(activityRecord.endDate).diff(moment(activityRecord.startDate), 'days');
}
