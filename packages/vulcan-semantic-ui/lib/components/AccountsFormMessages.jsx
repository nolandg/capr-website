import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replaceComponent, Components } from 'meteor/vulcan:core';

export class AccountsFormMessages extends Component {
  render () {
    console.log('I got ', this.props.messages);

    let z = this.props.messages.map(({ message, type }, i) => {
      console.log('I am here');
      return <Components.AccountsFormMessage message={message} type={type} key={i} />;
    });

    console.log('Z :', z);

    return(
      <div>
        {this.props.messages.map(({ message, type }, i) => {
          return <Components.AccountsFormMessage message={message} type={type} key={i} />;
        })}
      </div>
    );
  }
}

replaceComponent('AccountsFormMessages', AccountsFormMessages);
