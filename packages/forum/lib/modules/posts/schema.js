import Users from 'meteor/vulcan:users';
import { Utils, getSetting } from 'meteor/vulcan:core';
import { RichTextEditor } from 'meteor/noland:vulcan-semantic-ui';

const schema = {
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['admins'],
    onInsert: () => {
      return new Date();
    }
  },
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
  title: {
    type: String,
    optional: false,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'text',
    order: 20,
    searchable: true,
  },
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
  // Body is in React Draft format
  body: {
    type: String,
    optional: true,
    max: 3000,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'textarea',
    order: 30,
  },
  // HTML version of the post body
  htmlBody: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (post) => {
      if (post.body) {
        return RichTextEditor.stringToHtml(post.body);
      }
    },
    onEdit: (modifier, post) => {
      if (modifier.$set.body) {
        return RichTextEditor.stringToHtml(modifier.$set.body);
      }
    }
  },
  excerpt: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    searchable: true,
    onInsert: (post) => {
      if (post.body) {
        const excerptLength = 30;
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
};

export default schema;
