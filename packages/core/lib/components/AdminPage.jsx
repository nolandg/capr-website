import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container, Menu, Segment, Grid } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import { Utils } from 'meteor/vulcan:lib';

class AdminPage extends PureComponent {
  state = { activeItem: 'calculator' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderArticles = () =>{
    return (
      <div>
        <Components.EditModal title="New Article" component={Components.PostsEditForm}
          buttonAttrs={{icon: 'add', content: 'New Article'}} />
      </div>
    )
  }

  renderCalculator = () =>{
    return (
      <div>
        <Components.CO2eCalcAdmin />
      </div>
    )
  }

  render (){
    const { activeItem } = this.state;

    return (
      <div>
        <Divider hidden />
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item content="Articles" icon="newspaper" name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} />
              <Menu.Item content="Calculator" icon="calculator" name='calculator' active={activeItem === 'calculator'} onClick={this.handleItemClick} />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
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
