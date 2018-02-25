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
      console.log('onEdit');
      if (modifier.$set.bio) {
        return RichTextEditor.stringToHtml(modifier.$set.bio);
      }
    }
  }
});
