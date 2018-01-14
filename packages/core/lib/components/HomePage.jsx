import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Grid, Item, Segment, Button, Icon, Header } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import React, { PropTypes, PureComponent } from 'react';

class HomePage extends PureComponent {
  renderSong = () => {
    return (
      <div className='image-gallery-image video-wrapper manually-rendered-slide video-slide two-col-slide'>
        <Grid stackable>
          <Grid.Row>

            <Grid.Column width={10} className="left-col">
              <div className="embed-wrapper">
                <Embed id='y0vBlXrW0RU' placeholder='/song_thumb.jpg' source='youtube'/>
              </div>
            </Grid.Column>

            <Grid.Column width={6} className="right-col">
              <Item.Group as={Segment} basic>
                <Item>
                  <Item.Content>
                    <Item.Header>A Song For The World</Item.Header>
                    <Item.Meta>by Yvon Richard, Cindy Koppen &amp; Autum Skye</Item.Meta>
                    <Item.Description>
                      <em>A Song for the World</em> was originaly conceived in September, 2014 to increase awarness
                      about climate change and the environment prior to the 2015 Paris Climate Conference.
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    );
  }

  renderCarStops = () => {
    return (
      <div className='image-gallery-image video-wrapper manually-rendered-slide image-slide two-col-slide'>
        <Grid stackable>
          <Grid.Row>

            <Grid.Column width={10} className="left-col">
              <div className="image" style={{backgroundImage: 'url(/carstops.jpg)'}}/>
            </Grid.Column>

            <Grid.Column width={6} className="right-col">
              <Item.Group as={Segment} basic>
                <Item>
                  <Item.Content>
                    <Item.Header>Car Stops</Item.Header>
                    <Item.Meta>another great project by CAPR</Item.Meta>
                    <Item.Description>
                      This is actually a photo of Salt Spring Island car stops. Mmmmmm. Maybe someday we'll have a similar photo.
                      This is just here to get ideas on how we could use this space. Send me photos and text.
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    );
  }

  renderCalc = () => {
    return (
      <div className='image-gallery-image video-wrapper manually-rendered-slide image-slide two-col-slide'>
        <Grid stackable>
          <Grid.Row>

            <Grid.Column width={10} className="left-col">
              <div className="image" style={{backgroundImage: 'url(/calc.jpg)'}}/>
            </Grid.Column>

            <Grid.Column width={6} className="right-col">
              <Item.Group as={Segment} basic>
                <Item>
                  <Item.Content>
                    <Item.Header>Carbon Wise</Item.Header>
                    <Item.Meta>A carbon footprint calculator by CAPR</Item.Meta>
                    <Item.Description>
                      And here we could promote our awesome calculator.
                      And write something about it. And make this paragraph a bit longer.
                      Without going on and on, more in a meaningful manner like this.
                      Espeically like this last sentence. Yeah, this is a good one.
                    </Item.Description>
                    <Item.Extra>
                      <Button floated='right' color="green">
                        <Icon name="calculator" />Find My Footprint!
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    );
  }

  render(){
    const slides = [
      {
        thumbnail: 'song_thumb.jpg',
        renderItem: this.renderSong,
      },
      {
        thumbnail: 'carstops.jpg',
        renderItem: this.renderCarStops,
      },
      {
        thumbnail: 'calc.jpg',
        renderItem: this.renderCalc,
      },
    ];
    return (
      <div>
        <ImageGallery
          className="homepage-"
          items={slides}
          showPlayButton={false}
          showFullscreenButton={false}
        />

      </div>
    )
  }

}

registerComponent('HomePage', HomePage, withCurrentUser);
