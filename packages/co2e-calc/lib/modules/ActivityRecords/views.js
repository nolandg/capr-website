import { ActivityRecords } from './collection.js'

ActivityRecords.addView('userActivityRecords', terms => ({
  selector: {
    userId: terms.userId,
  },
  options: {
    sort: {
      createdAt: -1
    }
  }
}));

ActivityRecords.addView('userDateRange', terms => {
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
