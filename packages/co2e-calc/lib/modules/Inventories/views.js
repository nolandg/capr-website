import { Inventories } from './collection.js'

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
