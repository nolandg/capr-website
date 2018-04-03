import { Inventories } from './collection.js'

Inventories.addView('inventoriesList', terms => {
  const ret = {
    selector: {
      userId: terms.userId,
      startDate: terms.startDate?{$lte: new Date(terms.endDate)}:undefined,
      endDate: terms.endDate?{$gte: new Date(terms.startDate)}:undefined,
    },
    options: {
      sort: {
        createdAt: -1
      }
    }
  };

  return ret;
});

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
