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
