import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Users from 'meteor/vulcan:users';
import { Loader, Header, Container, Segment, Icon, Divider } from 'semantic-ui-react';

const UsersProfile = (props) => {
  if (props.loading) return <Loader />
  if (!props.document) return (
    <Container>
      Sorry, we couldn't find that user.<br />
      We have filed a missing persons report.
    </Container>
  );

  const user = props.document;
  const thisUser = props.currentUser && (user._id === props.currentUser._id);
  const isAdmin = Users.getGroups(user).indexOf('adminTier2') > -1;

  return (
    <Container>
      <Divider hidden />
      <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
      <Header as="h2" className="page-title" textAlign="center">
        {Users.getDisplayName(user)}
        <Header.Subheader><Icon name="vcard outline" />User Profile</Header.Subheader>
      </Header>

      {thisUser?(
        <Segment>
          <Components.AccountsLoginForm />
        </Segment>
      ):null}

      <Header as="h3">About Me</Header>
      {user.htmlBio ? <div dangerouslySetInnerHTML={{__html: user.htmlBio}}></div> : null }

      {isAdmin?(
        <Segment inverted textAlign="center">
          <Icon name="key" color="yellow" size="large" />
          &nbsp;&nbsp;<em>{user.displayName}</em> is an administrator
        </Segment>
      ):null}

      <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
        <Divider />
        <Components.EditModal document={user} title="Edit Profile" component={Components.UsersEditForm} collection="Users"
          showDelete={false} buttonAttrs={{floated: 'right', content: 'Edit Profile', icon: 'pencil'}} />
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
