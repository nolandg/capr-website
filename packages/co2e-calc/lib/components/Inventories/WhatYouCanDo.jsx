import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Item, Button, Header, Divider } from 'semantic-ui-react';
import moment from 'moment';

class WhatYouCanDo extends Component {
  render(){
    const { inventory } = this.props;
    const data = inventory.chartData.totals;
    const total = Math.round(data.total);
    const offsetCostPerKg = .030;
    const offsetCost = Math.round(total * offsetCostPerKg);
    const year = moment(inventory.startDate).year();

    return (
      <div>
        <Item.Group divided>
          <Item>
            <Item.Image src='/packages/co2e-calc/lib/assets/images/bike.jpg' />
            <Item.Content>
              <Item.Header as={Link} to="/">Reduce</Item.Header>
              <Item.Description>
                Let's write something about reduce
              </Item.Description>
              <Item.Extra>
                <Button as={Link} href="/" floated="right" color="green" size="large">
                  Show Me How
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>

          <Divider hidden />
          <Divider hidden />

          <Item>
            <Item.Image src='/packages/co2e-calc/lib/assets/images/offsets2.png' />
            <Item.Content>
              <Item.Header as='a' href="https://www.less.ca/en-ca/tonnes.cfm">Offset Your Emissions</Item.Header>
              <Item.Description>
                Offsetting is a mechanism that allows individuals and organizations to address their environmental impact. Carbon offsets are designed to help mitigate the emissions associated with one activity (such as necessary air travel) with another activity elsewhere that avoids or reduces an equivalent amount of emissions. For example, the impact of greenhouse gases (GHGs) associated with a flight from Toronto to Calgary may be neutralized by preventing the release of an equivalent amount of GHGs through the implementation of a renewable energy or energy efficiency project elsewhere in the world.
                <br />
                <Header as="h4">Offsetting 100% of your {year} emissions would cost approximately ${offsetCost}</Header>
              </Item.Description>
              <Item.Extra>
                <Button as='a' href="https://www.less.ca/en-ca/tonnes.cfm" floated="right" color="green" size="large">
                  Buy Offsets Now
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>

          <Divider hidden />
          <Divider hidden />

          <Item>
            <Item.Image src='/packages/co2e-calc/lib/assets/images/logo.png' />
            <Item.Content>
              <Item.Header as={Link} to="/">Donate to CAPR</Item.Header>
              <Item.Description>
                I'm sure we can write something very convincing here.
              </Item.Description>
              <Item.Extra>
                <Button as={Link} to="/" floated="right" color="green" size="large">
                  Donate Now
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

registerComponent('WhatYouCanDo', WhatYouCanDo);
