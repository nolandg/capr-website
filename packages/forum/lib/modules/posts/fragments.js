import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment PostsList on Post {
    # posts
    _id
    title
    url
    slug
    createdAt
    excerpt
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
    # embedly
    thumbnailUrl
  }
`);

registerFragment(`
  fragment PostsPage on Post {
    ...PostsList
    body
    htmlBody
  }
`);
