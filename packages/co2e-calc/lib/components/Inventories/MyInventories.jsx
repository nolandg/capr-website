import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react'

class MyInventories extends PureComponent {

  render(){
    return (
      <div>
        <Header as="h1">Carbon Wise Admin</Header>
      </div>
    )
  }
}

registerComponent('MyInventories', MyInventories);
