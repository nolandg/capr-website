/*

Posts schema

*/

import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';
import { stringToHtml } from '../../components/common/RichTextEditor';

registerSetting('forum.postExcerptLength', 30, 'Length of posts excerpts in words');

/**
 * @summary Posts config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2
  }
};

/**
 * @summary Posts schema
 * @type {Object}
 */
const schema = {
  /**
    ID
  */
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    Timetstamp of post creation
  */
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['admins'],
    onInsert: () => {
      return new Date();
    }
  },
  /**
    Timestamp of post first appearing on the site (i.e. being approved)
  */
  postedAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['admins'],
    editableBy: ['admins'],
    control: 'datetime',
    group: formGroups.admin,
    onInsert: (post, currentUser) => {
      return new Date();
    }
  },
  /**
    URL
  */
  url: {
    type: String,
    optional: true,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'url',
    order: 10,
    searchable: true,
    form: {
      query: `
        SiteData{
          logoUrl
          title
        }
      `,
    },
  },
  /**
    Title
  */
  title: {
    type: String,
    optional: false,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'text',
    order: 20,
    searchable: true
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (post) => {
      return Utils.slugify(post.title);
    },
    onEdit: (modifier, post) => {
      if (modifier.$set.title) {
        return Utils.slugify(modifier.$set.title);
      }
    }
  },
  /**
    Post body (markdown)
  */
  body: {
    type: String,
    optional: true,
    max: 3000,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'textarea',
    order: 30
  },
  /**
    HTML version of the post body
  */
  htmlBody: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (post) => {
      if (post.body) {
        return stringToHtml(post.body);
      }
    },
    onEdit: (modifier, post) => {
      if (modifier.$set.body) {
        return stringToHtml(modifier.$set.body);
      }
    }
  },
  /**
   Post Excerpt
   */
  excerpt: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    searchable: true,
    onInsert: (post) => {
      if (post.body) {
        // excerpt length is configurable via the settings (30 words by default, ~255 characters)
        const excerptLength = getSetting('forum.postExcerptLength', 30);
        return Utils.trimHTML(post.htmlBody, excerptLength);
      }
    },
    onEdit: (modifier, post) => {
      if (modifier.$set.body) {
        const excerptLength = getSetting('forum.postExcerptLength', 30);
        return Utils.trimHTML(modifier.$set.htmlBody, excerptLength);
      }
    }
  },

  /**
    Save info for later spam checking on a post. We will use this for the akismet package
  */
  userIP: {
    type: String,
    optional: true,
    viewableBy: ['admins'],
  },
  userAgent: {
    type: String,
    optional: true,
    viewableBy: ['admins'],
  },
  referrer: {
    type: String,
    optional: true,
    viewableBy: ['admins'],
  },
  /**
    The post author's name
  */
  author: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onEdit: (modifier, document, currentUser) => {
      // if userId is changing, change the author name too
      if (modifier.$set && modifier.$set.userId) {
        return Users.getDisplayNameById(modifier.$set.userId)
      }
    }
  },
  /**
    The post author's `_id`.
  */
  userId: {
    type: String,
    optional: true,
    control: 'select',
    viewableBy: ['guests'],
    insertableBy: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: async (post, args, context) => {
        if (!post.userId) return null;
        const user = await context.Users.loader.load(post.userId);
        return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
      },
      addOriginalField: true
    },
  },

  // GraphQL-only fields

  domain: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, context) => {
        return Utils.getDomain(post.url);
      },
    }
  },

  pageUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getPageUrl(post, true);
      },
    }
  },

  linkUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return post.url ? Utils.getOutgoingUrl(post.url) : Posts.getPageUrl(post, true);
      },
    }
  },

  emailShareUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getEmailShareUrl(post);
      }
    }
  },

  twitterShareUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getTwitterShareUrl(post);
      }
    }
  },

  facebookShareUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (post, args, { Posts }) => {
        return Posts.getFacebookShareUrl(post);
      }
    }
  },

};

export default schema;
