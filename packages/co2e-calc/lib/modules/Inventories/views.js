import { Inventories } from './collection.js'
import moment from 'moment';

Inventories.addView('userInventoriesRecords', terms => ({
  selector: {
    userId: terms.userId,
  },
  options: {
    sort: {
      createdAt: -1
    }
  }
}));

Inventories.addView('userDateRange', terms => {
  return {
    selector: {
      userId: terms.userId,
      startDate: {$lte: new Date(terms.endDate)},
      endDate: {$gte: new Date(terms.startDate)},
    },
    options: {
      limit: 100,
    }
  }
});
