import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react'
import { Inventories } from '../../modules/Inventories';
import  { EditForm } from 'meteor/noland:vulcan-semantic-ui';
import moment from 'moment';
import _ from 'lodash';

class InventoryEditForm extends EditForm {
  constructor(props) {
    const fields = ['postalCode', 'homeArea', 'homeAreaUnits', 'homeOccupantCount', 'startDate', 'endDate'];
    super(props, fields);

    if(this.isNew()){
      _.set(this.state, 'values.startDate', moment().year(props.year).startOf('year'));
      _.set(this.state, 'values.endDate', moment().year(props.year).endOf('year'));
      _.set(this.state, 'values.areaUnits', 'sqft');
    }
  }

  render(){
    const { FormField, SelectField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const areaUnits = [{value: 'sqft', text: 'square feet'}, {value: 'sqm', text: 'square meters'}];

    return (
      <Form error={!!errors}>
        {this.renderMessages()}

        <p>
          It's important to collect a bit of information about your home to compare
          your heating and electricity costs to homes nearby and around the province.
        </p>
        <p>
          All of your information is strictly confidential and will not be shared with
          anyone without your explicit consent.
        </p>

        <FormField label={<span><Icon name="users" />How many people live in your home?</span>} name="homeOccupantCount" widthEm={9} {...fieldProps} />
        <Form.Group width="equal">
          <FormField label="What is the area of your home?" name="homeArea" widthEm={20} {...fieldProps} />
          <SelectField label="Units" name="homeAreaUnits" options={areaUnits} widthEm={9} {...fieldProps} />
        </Form.Group>
        <FormField label="What is the postal code of your home?" name="postalCode" widthEm={9} {...fieldProps} />

      </Form>
    )
  }
}

registerComponent('InventoryEditForm', InventoryEditForm,
  [withEdit, {collection: Inventories, fragmentName: 'InventoriesList'}],
  [withRemove, {collection: Inventories}],
  [withNew, {collection: Inventories, fragmentName: 'InventoriesList'}],
  withCurrentUser
);
