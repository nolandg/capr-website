import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Divider, Button, Image } from 'semantic-ui-react'
import { Components, registerComponent } from 'meteor/vulcan:core';

class AboutModal extends PureComponent {
  render (){
    const { open, onClose, ...rest } = this.props;

    return (
      <Modal {...rest} open={open} onClose={onClose}>
        <Modal.Content image>
          <Image wrapped size="medium" src='/packages/co2e-calc/lib/assets/images/colibri.jpg' />
          <Modal.Description>
            <Header as="h2">
              Colibri Carbon
              <Header.Subheader>Carbon accounting software solutions</Header.Subheader>
            </Header>
            Hi, I'm Noland and I am Colibri Carbon.<br /><br />
            I specialize in web-based software and mobile app solutions
            for the environmental sector. I develop elegantly user-friendly, highly functional, data-driven software
            to solve any problem.
            <br /><br />
            I live and work in beautiful Powell River, BC.
            Contact me to discuss licencing and customization of this footprint calculator for your area
            or to chat about your next project. Quotes are always free.
            <br /><br />
            <i>
            Noland Germain<br />
            <a href="mailto:noland.germain@gmail.com">noland.germain@gmail.com</a><br />
            <a href="tel:+1-604-618-9598">604-618-9598</a><br />
            7 - 3965 Yaroshuk Rd, Powell River, BC, Canada
            </i>
            <Divider />
            <Button icon="close" content="Close" floated="right" onClick={onClose} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

AboutModal.propTypes = {
};

registerComponent('AboutModal', AboutModal);
