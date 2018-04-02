import { registerFragment } from 'meteor/vulcan:core';

// ------------------------------ Users ------------------------------ //
registerFragment(`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
  }
`);

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    displayName
    email
    isAdmin
    bio
    htmlBio
    groups
  }
`);
