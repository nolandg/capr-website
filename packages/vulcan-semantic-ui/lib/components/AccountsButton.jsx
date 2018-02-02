import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import { Button } from 'semantic-ui-react';

export class AccountsButton extends PureComponent {
  render () {

    let {
      label,
      type,
      disabled = false,
      className,
      onClick
    } = this.props;

    if(className) className = className.replace('active', '');

    let icon = null;
    if(className){
      if(!!~(className.indexOf('facebook'))) icon = 'facebook';
      else if(!!~(className.indexOf('google'))) icon = 'google';
      else if(!!~(className.indexOf('twitter'))) icon = 'twitter';
    }

    return type === 'link' ?
      <a href="#" className={className} onClick={onClick} style={{marginRight: '10px'}}>{label}</a> :
      <Button
        className={className}
        type={type}
        disabled={disabled}
        onClick={onClick}
        icon={icon}
        >
        {label}
      </Button>;
  }
}
AccountsButton.propTypes = {
  onClick: PropTypes.func
};

replaceComponent('AccountsButton', AccountsButton);
