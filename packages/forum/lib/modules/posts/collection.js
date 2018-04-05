/*

Posts collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Posts.
 * @namespace Posts
 */
export const Posts = createCollection({
  collectionName: 'Posts',
  typeName: 'Post',
  schema,
  resolvers: getDefaultResolvers('Posts'),
  mutations: getDefaultMutations('Posts'),
});

// refactor: moved here from schema.js
Posts.config = {};

Posts.checkAccess = (currentUser, post) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, post)) {
    // admins can always see everything, users can always see their own posts
    return true;
  }  else {
    return Users.canDo(currentUser, `posts.view`);
  }
}
