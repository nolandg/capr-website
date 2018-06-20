import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import { Container, Divider, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

class CalculatorPage extends PureComponent {
  render (){
    if(this.props.currentUserLoading) return 'Loading...';
    if(!this.props.currentUser){
      return (
        <Container text>
          <Divider hidden />
          <Segment>
            You need to <Link to="/login">Log in</Link> to measure your footprint.
            <br /><br />
            If you don't already have an account, you can quickly create one
            for free using your email address or your Google or Facebook or Twitter account.
            <br /><br />
            <Button size="large" color="green" floated="right" content="Login Now" as={Link} to="/login" />
          </Segment>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
        </Container>
      );
    }

    return (
      <Components.MyInventories terms={{view: 'userInventoriesRecords', userId: this.props.currentUser._id}}/>
    )
  }
}

CalculatorPage.propTypes = {
};

registerComponent('CalculatorPage', CalculatorPage, withCurrentUser);
