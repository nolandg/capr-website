import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon } from 'semantic-ui-react'

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
    console.log('delete')
    this.formActions.delete();
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}><Icon name='write' />Edit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer="blurring"
        closeOnDimmerClick={false}
      >
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <this.props.component documentId={this.props.document._id} registerActions={this.registerActions} closeModal={this.handleClose} />
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

registerComponent('EditModal', EditModal);
