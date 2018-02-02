import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Posts } from '../../modules/posts/index.js';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Container, Segment, Item, Header } from 'semantic-ui-react';
import moment from 'moment';

class PostsPage extends PureComponent {

  render() {
    if (this.props.loading) return <div className="posts-page"><Components.Loading/></div>

    const post = this.props.document;

    return (
      <div className="posts-page">
        <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />

        <Divider hidden />
        <Container text>

          <Header as="h1">{post.title}</Header>
          <div className="posts-page-body" dangerouslySetInnerHTML={{__html: post.htmlBody}} />

          <Item.Group><Item>
            <Item.Image size="tiny" src={post.user.avatarUrl} />
            <Item.Content>
              <Item.Meta>Posted {moment(new Date(post.postedAt)).fromNow()} by</Item.Meta>
              <Item.Header>{Users.getDisplayName(post.user)}</Item.Header>
              <Item.Extra>
                <Components.EditModal document={post} title="Edit Post" component={Components.PostsEditForm}
                  buttonAttrs={{floated: 'right', size: 'tiny', content: 'Edit Post'}} />
              </Item.Extra>
            </Item.Content>
          </Item></Item.Group>
        </Container>

      </div>
    );

  }
}

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostsPage',
};
registerComponent('PostsPage', PostsPage, withCurrentUser, [withDocument, queryOptions]);
