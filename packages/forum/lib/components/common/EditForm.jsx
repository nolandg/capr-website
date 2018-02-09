import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class EditForm extends Component {
  constructor(props, defaultNewDocument) {
    super(props);

    if(this.isNew()){
      this.state = defaultNewDocument;
    }else{
      const state = {};
      for (const field in defaultNewDocument){
        state[field] = props.document[field];
      }
      this.state = state;
    }
  }

  isNew = () => {
    return !this.props.document;
  }

  handleChange = (e, { name, value, type, checked }) => {
    switch (type) {
      case 'checkbox':
        this.setState({ [name]: checked });
        break;
      default:
        this.setState({ [name]: value });
    }
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

export default EditForm;
