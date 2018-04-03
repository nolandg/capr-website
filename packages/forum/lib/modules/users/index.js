import Users from 'meteor/vulcan:users';
import { RichTextEditor } from 'meteor/noland:vulcan-semantic-ui';
import { removeCallback } from 'meteor/vulcan:core';

removeCallback('users.edit.sync', 'usersEditGenerateHtmlBio');

Users.addField({
  fieldName: 'htmlBio',
  fieldSchema: {
    onInsert: (user) => {
      if (user.bio) {
        return RichTextEditor.stringToHtml(user.bio);
      }
    },
    onEdit: (modifier, user) => {
      if (modifier.$set.bio) {
        return RichTextEditor.stringToHtml(modifier.$set.bio);
      }
    }
  }
});

Users.createGroup('adminTier2');

Users.addField({
  fieldName: 'groups',
  fieldSchema: {
    type: Array,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['adminTier2'],
    editableBy: ['admins', 'adminTier2'],
  }
});
