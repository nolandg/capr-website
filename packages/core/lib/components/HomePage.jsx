import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';

const HomePage = ({currentUser, children, currentRoute}) =>

  <div>

    homepage

  </div>

registerComponent('HomePage', HomePage, withCurrentUser);
