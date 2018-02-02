import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';


class EditModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  registerActions = (actions) => {
    this.formActions = actions;
  }

  handleSave = () => {
    this.formActions.submit();
  }

  handleDelete = () => {
    this.formActions.delete();
  }

  handleDocumentRemoved = () => {
    this.props.router.transitionTo(this.props.router.createLocation('/'));
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} {...this.props.buttonAttrs} color="blue" />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer="blurring"
        closeOnDimmerClick={false}
      >
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <this.props.component
              documentId={this.props.document._id}
              registerActions={this.registerActions}
              closeModal={this.handleClose}
              documentRemoved={this.handleDocumentRemoved}/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={this.handleClose}><Icon name='cancel' />Cancel</Button>
          <Button color='red' onClick={this.handleDelete}><Icon name='trash' />Delete</Button>
          <Button color='green' onClick={this.handleSave}><Icon name='save' />Save</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

registerComponent('EditModal', EditModal, withRouter);
