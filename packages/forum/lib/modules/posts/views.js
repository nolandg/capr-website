import { Posts } from './collection.js'

Posts.addView('keyHistory', terms => {
  const ret = {
    selector: {
      key: terms.key,
    },
    options: {
      sort: {
        createdAt: -1
      }
    }
  };

  return ret;
});
