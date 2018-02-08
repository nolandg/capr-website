import Users from 'meteor/vulcan:users';
import { Posts } from './collection.js'
import moment from 'moment';

/**
 * @summary Base parameters that will be common to all other view unless specific properties are overwritten
 */
Posts.addDefaultView(terms => ({
  selector: {
    status: Posts.config.STATUS_APPROVED,
    isFuture: {$ne: true} // match both false and undefined
  }
}));

/**
 * @summary New view
 */
Posts.addView('new', terms => ({
  options: {
    sort: {postedAt: -1}
  }
}));

/**
 * @summary User posts view
 */
Posts.addView('userPosts', terms => ({
  selector: {
    userId: terms.userId,
    status: Posts.config.STATUS_APPROVED,
    isFuture: {$ne: true}
  },
  options: {
    limit: 5,
    sort: {
      postedAt: -1
    }
  }
}));
