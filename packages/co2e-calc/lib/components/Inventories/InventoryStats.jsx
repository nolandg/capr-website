import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Statistic, Grid, Icon } from 'semantic-ui-react';

class InventoryStats extends Component {
  render(){
    const { inventory } = this.props;
    const data = inventory.chartData.totals;
    const total = Math.round(data.total);
    const earths = 2.7;
    const volumeOfPool = 2500000; // L
    const volume1KgCarbon = 556.2; // L
    const pools = (total*volume1KgCarbon/volumeOfPool).toFixed(1);
    const kgPerPerson = Math.round(data.total/(inventory.homeOccupantCount || 1));
    const homeKg = data.data.reduce((acc, d) => {
      const homeActivities = ['electricity', 'natural-gas', 'propane', 'heating-oil'];
      if(homeActivities.indexOf(d.name) !== -1) return acc + d.value;
      else return acc;
    }, 0);
    const kgPerHomeArea = (homeKg / inventory.homeArea).toFixed(1);
    const offsetCostPerKg = .030;
    const offsetCost = Math.round(total * offsetCostPerKg);

    // icons needed: swimming pool, justice scales to offset, co2 cloud

    return (
      <div className="inventory-stats">
        <Grid columns={3} divided doubling>
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="cloud" /> {total}</Statistic.Value>
              <Statistic.Label>kilograms of CO<sub>2</sub></Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="cube" /> {pools}</Statistic.Value>
              <Statistic.Label>Olympic swimming pools of CO<sub>2</sub></Statistic.Label>
            </Statistic>
          </Grid.Column>
          {/* <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="globe" /> {earths}</Statistic.Value>
              <Statistic.Label>Earths required to support you</Statistic.Label>
            </Statistic>
          </Grid.Column> */}
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="dollar" /> {offsetCost}</Statistic.Value>
              <Statistic.Label>Cost to offset</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="users" /> {kgPerPerson}</Statistic.Value>
              <Statistic.Label>Kilograms of CO<sub>2</sub> per person</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column>
            <Statistic>
              <Statistic.Value><Icon name="home" /> {kgPerHomeArea}</Statistic.Value>
              <Statistic.Label>Kilograms of CO<sub>2</sub> per {inventory.homeAreaUnits}</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

registerComponent('InventoryStats', InventoryStats);
