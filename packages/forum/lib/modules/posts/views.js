import { Posts } from './collection.js'

Posts.addView('keyHistory', terms => {
  const ret = {
    selector: {
      contentKey: terms.contentKey,
    },
    options: {
      sort: {
        createdAt: -1
      }
    }
  };

  return ret;
});
