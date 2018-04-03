import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Segment, Menu, Grid } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import { Utils } from 'meteor/vulcan:lib';

class AdminPage extends PureComponent {
  state = { activeItem: 'calculator' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderArticles = () =>{
    return (
      <Segment>
        <Components.EditModal component={Components.PostsEditForm} collection='Posts'
          title="New Article" buttonAttrs={{icon: 'plus', content: 'Add New Article', color: 'blue'}} />
      </Segment>
    )
  }

  renderCalculator = () =>{
    return (
      <div>
        <Components.CO2eCalcAdmin />
      </div>
    )
  }

  renderUsers = () =>{
    return (
      <div>
        <Components.UsersList />
      </div>
    )
  }

  render (){
    const { activeItem } = this.state;

    return (
      <div style={{margin: '30px 10px 30px 10px'}}>
        <Grid>
          <Grid.Column width={4} className="admin-page-left">
            <Menu fluid vertical tabular size="huge">
              <Menu.Item content="Calculator" icon="calculator" name='calculator' active={activeItem === 'calculator'} onClick={this.handleItemClick} />
              <Menu.Item content="Articles" icon="newspaper" name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} />
              <Menu.Item content="Users" icon="users" name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12} className="admin-page-right">
            {this[Utils.dashToCamel('render-' + activeItem)]()}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

AdminPage.propTypes = {
};

registerComponent('AdminPage', AdminPage, withCurrentUser);
