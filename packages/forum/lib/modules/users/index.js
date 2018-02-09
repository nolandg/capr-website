import Users from 'meteor/vulcan:users';
import { stringToHtml } from '../../components/common/RichTextEditor';
import { removeCallback } from 'meteor/vulcan:core';

removeCallback('users.edit.sync', 'usersEditGenerateHtmlBio');

Users.addField({
  fieldName: 'htmlBio',
  fieldSchema: {
    onInsert: (user) => {
      if (user.bio) {
        return stringToHtml(user.bio);
      }
    },
    onEdit: (modifier, user) => {
      console.log('onEdit');
      if (modifier.$set.bio) {
        return stringToHtml(modifier.$set.bio);
      }
    }
  }
});
