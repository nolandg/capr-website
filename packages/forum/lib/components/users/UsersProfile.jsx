import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { Loader, Header, Container, Button, Icon } from 'semantic-ui-react';

const UsersProfile = (props) => {
  if (props.loading) return <Loader />
  if (!props.document) return (
    <Container>
      Sorry, we couldn't find that user.<br />
      We have filed a missing persons report.
    </Container>
  )

  const user = props.document;

  return (
    <Container text className="page users-profile">
      <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
      <Header as="h2" className="page-title" textAlign="center">
        {Users.getDisplayName(user)}
        <Header.Subheader><Icon name="vcard outline" />User Profile</Header.Subheader>
      </Header>

      {user.htmlBio ? <div dangerouslySetInnerHTML={{__html: user.htmlBio}}></div> : null }
      {/* <Components.UsersEditForm documentId={user._id} /> */}

      <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
        <Components.EditModal documentId={user._id} title="Edit Profile" component={Components.UsersEditForm}
          showDelete={false} buttonAttrs={{content: 'Edit Profile', icon: 'pencil'}} />
      </Components.ShowIf>

    </Container>
  )

}

UsersProfile.propTypes = {
  // document: PropTypes.object.isRequired,
}

UsersProfile.displayName = "UsersProfile";

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

registerComponent('UsersProfile', UsersProfile, withCurrentUser, [withDocument, options]);
