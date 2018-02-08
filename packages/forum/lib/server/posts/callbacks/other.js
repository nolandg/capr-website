/*

Callbacks to:

- Increment a user's post count
- Run post approved callbacks
- Update a user's post count
- Remove a user's posts when it's deleted
- Track clicks

*/

import { Posts } from '../../../modules/posts/index.js'
import Users from 'meteor/vulcan:users';
import { addCallback, runCallbacks, runCallbacksAsync } from 'meteor/vulcan:core';

/**
 * @summary Increment the user's post count
 */
function PostsNewIncrementPostCount(post) {
  var userId = post.userId;
  Users.update({ _id: userId }, { $inc: { 'postCount': 1 } });
}
addCallback('posts.new.async', PostsNewIncrementPostCount);

//////////////////////////////////////////////////////
// posts.remove.sync                                //
//////////////////////////////////////////////////////
function PostsRemoveOperations(post) {
  Users.update({ _id: post.userId }, { $inc: { 'postCount': -1 } });
  return post;
}
addCallback('posts.remove.sync', PostsRemoveOperations);

//////////////////////////////////////////////////////
// users.remove.async                               //
//////////////////////////////////////////////////////
function UsersRemoveDeletePosts(user, options) {
  if (options.deletePosts) {
    Posts.remove({ userId: user._id });
  } else {
    // not sure if anything should be done in that scenario yet
    // Posts.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
addCallback('users.remove.async', UsersRemoveDeletePosts);

//////////////////////////////////////////////////////
// posts.approve.sync                              //
//////////////////////////////////////////////////////
function PostsApprovedSetPostedAt(modifier, post) {
  modifier.postedAt = new Date();
  return modifier;
}
addCallback('posts.approve.sync', PostsApprovedSetPostedAt);
