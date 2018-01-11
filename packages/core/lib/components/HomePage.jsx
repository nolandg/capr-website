import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Embed, Grid } from 'semantic-ui-react'
import ImageGallery from 'react-image-gallery';
import React, { PropTypes, PureComponent } from 'react';

class HomePage extends PureComponent {
  renderSong = () => {
      return (
        <div className='image-gallery-image video-wrapper'>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Embed id='y0vBlXrW0RU' placeholder='/song_thumb.jpg' source='youtube'/>
              </Grid.Column>
              <Grid.Column width={4}>
                Yvon and friends sing <em>A Song for the World</em>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
  }

  render(){
    const slides = [
      {
        thumbnail: 'song_thumb.jpg',
        renderItem: this.renderSong,
      },
      {
        original: 'tinhat.jpg',
        thumbnail: 'tinhat.jpg',
      },
      {
        original: 'ssct.jpg',
        thumbnail: 'ssct.jpg',
      },
      {
        original: 'bcbr.jpg',
        thumbnail: 'bcbr.jpg',
      },
    ];
    return (
      <div>
        <ImageGallery
          className="homepage-"
          items={slides}
          showPlayButton={false}
        />
        homepage
      </div>
    )
  }

}

registerComponent('HomePage', HomePage, withCurrentUser);
