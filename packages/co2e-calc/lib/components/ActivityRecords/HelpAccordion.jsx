import React, { Component, PureComponent } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Segment, Header, Image, Divider, Icon } from 'semantic-ui-react'

class HelpAccordion extends Component {

  render() {
    const { items, title, subtitle } = this.props;

    if(!items || !items.length) return null;

    const accordionItems = items.map((item) => { return {
      title: <Header as="h5" inverted style={{display: 'inline'}}>{item.title}</Header>,
      content:
        <div>
          {item.content}

          {item.image?
            <div className="help-image">
              <Divider hidden />
              <Image rounded src={item.image} />
            </div>
            :null
          }
        </div>,
    }});

    return (
      <Segment inverted>
        <Header as="h3" inverted>
          <Icon name="question" />
          <Header.Content>
            {title}
            <Header.Subheader>{subtitle}</Header.Subheader>
          </Header.Content>
        </Header>
        <Components.Accordion inverted items={accordionItems} />
      </Segment>
    );
  }
}

registerComponent('HelpAccordion', HelpAccordion);
