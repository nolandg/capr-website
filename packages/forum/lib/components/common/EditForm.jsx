import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';


class EditForm extends Component {
  constructor(props, fields, defaultNewDocument) {
    super(props);

    if(this.isNew()){
      this.state = defaultNewDocument;
    }else{
      const state = {};
      fields.forEach((field) => {
        state[field] = props.document[field];
      });
      this.state = state;
    }
  }

  isNew = () => {
    return !(this.props.documentId || this.props.slug);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submit = () => {
    if(!this.isNew()){
      this.props.editMutation({documentId: this.props.document._id, set: this.state})
        .then(this.props.closeModal)
        .catch(this.handleError);
    }else{
      this.props.newMutation({document: this.state})
        .then(this.props.closeModal)
        .catch(this.handleError);
    }
  }

  delete = () => {
    this.props.removeMutation({documentId: this.props.document._id}).then(this.props.documentRemoved).catch(this.handleError);
  }

  handleError = (error) => {
    console.error(error);
  }

  componentDidMount() {
    if(this.props.registerActions) this.props.registerActions({
      submit: this.submit,
      delete: this.delete,
    });
  }

  render() {
    return (
      <Form>
        {this.props.children}
      </Form>
    );
  }
}

registerComponent(EditForm, 'EditForm');
