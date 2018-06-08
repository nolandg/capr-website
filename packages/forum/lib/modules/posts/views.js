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

Posts.addView('tagged', terms => {
  const ret = {
    selector: {
      tag: terms.tag,
    },
    options: {
      sort: {
        createdAt: -1
      }
    }
  };

  return ret;
});
