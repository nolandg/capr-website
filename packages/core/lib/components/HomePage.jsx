import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Grid, Item, Segment, Button, Icon, Header, Container, Divider } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';

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
          showPlayButton={true}
          showFullscreenButton={false}
          autoPlay={true}
        />
        <Divider section hidden />

        <Grid centered doubling stackable padded='horizontally'>

          <Grid.Column width={8}>
            <Header as="h1" textAlign="center">CAPR</Header>

            <Segment color="orange" size="large" compact>
              <Item.Group>
                <Item>
                  <Item.Image src="/logo.png" />
                  <Item.Content>
                    <Item.Header>Who We Are</Item.Header>
                    <Item.Description>
                      Climate Action Powell River Society (CAPR) is a non-profi t society
                      committed to helping the residents and businesses of Powell River to
                      reduce their greenhouse gas (GHG) emissions and also to support the
                      vision and goals of the Paris Agreement and the Powell River
                      Integrated Community Sustainability Plan (ICSP).
                    </Item.Description>
                    <Item.Extra>
                      <Button as={Link} to="/about-us" floated="right" color="orange">
                        Read more...
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>

            <Segment color="green" size="large" compact>
              <Item.Group>
                <Item>
                  <Item.Image src="/roadmap.png" as="a" href="/CAPR-Roadmap.pdf"/>
                  <Item.Content>
                    <Item.Header>The Roadmap</Item.Header>
                    <Item.Meta>Reduce Offset Adapt Drawdown</Item.Meta>
                    <Item.Description>
                      CAPR’s ROAD Map is fi rst of all a “road” or “course” that has
                      a starting point and a destination. Second, it is a map that helps
                      us navigate and reach our goals of reduced total GHG emissions,
                      environmental health and sustainability.
                      <br /><br />
                      CAPR has identifi ed four distinct strategies that will facilitate our
                      emission reduction and environmental health and
                      sustainability: Reduction, Offsetting, Adaptation, and Drawdown.
                    </Item.Description>
                    <Item.Extra>
                      <Button as={Link} to="/about-us" floated="right" color="green">
                        Read more...
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>

          </Grid.Column>

          <Grid.Column width={8}>
            <Header as="h1" textAlign="center">Recent Articles</Header>
            <Segment color="blue" compact>
              <Item.Group>
                <Item>
                  <Item.Image src="/carstops.jpg" />
                  <Item.Content>
                    <Item.Header>An Article Title Here</Item.Header>
                    <Item.Meta>One line summary/pull-quote here</Item.Meta>
                    <Item.Description>
                      The first few sentences of the article go here.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Item.Description>
                    <Item.Extra>
                      <Link to="/" style={{float: 'right'}}>Read more...</Link>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>

              <Item.Group>
                <Item>
                  <Item.Image src="/carstops.jpg" />
                  <Item.Content>
                    <Item.Header>An Article Title Here</Item.Header>
                    <Item.Meta>One line summary/pull-quote here</Item.Meta>
                    <Item.Description>
                      The first few sentences of the article go here.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Item.Description>
                    <Item.Extra>
                      <Link to="/" style={{float: 'right'}}>Read more...</Link>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>

              <Item.Group>
                <Item>
                  <Item.Image src="/carstops.jpg" />
                  <Item.Content>
                    <Item.Header>An Article Title Here</Item.Header>
                    <Item.Meta>One line summary/pull-quote here</Item.Meta>
                    <Item.Description>
                      The first few sentences of the article go here.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Item.Description>
                    <Item.Extra>
                      <Link to="/" style={{float: 'right'}}>Read more...</Link>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>

              <Item.Group>
                <Item>
                  <Item.Image src="/carstops.jpg" />
                  <Item.Content>
                    <Item.Header>An Article Title Here</Item.Header>
                    <Item.Meta>One line summary/pull-quote here</Item.Meta>
                    <Item.Description>
                      The first few sentences of the article go here.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Item.Description>
                    <Item.Extra>
                      <Link to="/" style={{float: 'right'}}>Read more...</Link>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Grid.Column>

        </Grid>
        <Divider section hidden />

      </div>
    )
  }

}

registerComponent('HomePage', HomePage, withCurrentUser);
