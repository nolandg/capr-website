import { Components, registerComponent, withEdit, withRemove, withCurrentUser, withNew } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Form } from 'semantic-ui-react';
import  {  EditForm } from 'meteor/noland:vulcan-semantic-ui';
import _ from 'lodash';

class UsersEditForm extends EditForm {
  constructor(props){
    const fields = ['displayName', 'bio'];
    if(!props.currentUserLoading && Users.canEditField(props.currentUser, Users.options.schema.groups, props.document)){
      fields.push('groups');
    }
    super(props, fields);

    this.state.isAdminTier2 = props.document?Users.getGroups(props.document).indexOf('adminTier2') > -1:false;
  }

  handleAdminChange = (e, {checked}) => {
    const user = this.props.document;

    this.setState({isAdminTier2: checked});
    let groups = Users.getGroups(user);
    if(checked) groups = _.union(groups, ['adminTier2']);
    else groups = groups.filter(group => group !== 'adminTier2');

    this.updateValue('groups', groups);
  }

  render(){
    if(!this.props.document) return <div>Loading...</div>;

    const user = this.props.document;
    const { FormField, RichTextField, CheckboxField } = Components;
    const { values, errors } = this.state;
    const fieldProps = { values, errors, onChange: this.handleChange };
    const isAdminTier2 = this.state.isAdminTier2;

    return (
      <Form error={!!this.state.errors}>
        {this.renderMessages()}

        <FormField label="Display Name" name="displayName" {...fieldProps} />
        <RichTextField label="Bio" name="bio" {...fieldProps} />
        {Users.canEditField(this.props.currentUser, Users.simpleSchema().schema().groups, user)?
          <CheckboxField label="Is an Administrator" name="isAdminTier2" value={true}
            onChange={this.handleAdminChange} errors={errors} values={{isAdminTier2}}/>
        :null}
      </Form>
    );
  }
}

UsersEditForm.propTypes = {
};

registerComponent('UsersEditForm', UsersEditForm,
  [withEdit, {collection: Users, fragmentName: 'UsersProfile'}],
  [withRemove, {collection: Users}],
  [withNew, {collection: Users, fragmentName: 'UsersProfile'}],
  withCurrentUser
);
