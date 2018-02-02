import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import {  Message, Icon } from 'semantic-ui-react';

export class AccountsFormMessage extends Component {
  render () {

    let {type, message} = this.props;

    return (
      <Message error>
        <Icon name={type==='error'?'dont':'exclamation triangle'} />
        {message}
      </Message>
    );
  }
}

replaceComponent('AccountsFormMessage', AccountsFormMessage);
