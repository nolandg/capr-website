import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { Image } from 'semantic-ui-react'

const UsersAvatar = ({className, user}) => {

  const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user) || 'http://keywordsuggest.org/gallery/249825.html';
  const avatar = <Image avatar alt={Users.getDisplayName(user)} src={avatarUrl} title={user.username}/>;

  return (
    <span className='user-avatar'>
      <Link to={Users.getProfileUrl(user)}>
        {avatar}{Users.getDisplayName(user)}
      </Link>
    </span>
  );

}

UsersAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.string,
}

UsersAvatar.defaultProps = {
  size: 'medium',
  link: true
}

registerComponent('UsersAvatar', UsersAvatar);
