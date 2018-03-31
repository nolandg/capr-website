import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Posts } from '../../modules/posts/index.js';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Container, Comment, Header } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router';

class PostsPageView extends PureComponent {

  render() {
    if (this.props.loading) return <div className="posts-page"><Components.Loading/></div>

    const post = this.props.document;
    const userName = Users.getDisplayName(post.user);
    const link = Posts.getLink(post);
    const avatarUrl = post.user.avatarUrl;
    const date = moment(post.postedAt).fromNow();

    return (
      <div className="posts-page">
        <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />

        <Divider hidden />
        <Container text>

          <Header as="h1">{post.title}</Header>
          <div className="posts-page-body" dangerouslySetInnerHTML={{__html: post.htmlBody}} />

          <Comment.Group>
            <Comment>
              <Comment.Avatar src={avatarUrl} />
              <Comment.Content>
                <Comment.Author as={Components.UsersName} user={post.user} />
                <Comment.Metadata>
                  <div>{date}</div>
                </Comment.Metadata>
                <Comment.Actions>
                  <Components.EditModal document={post} component={Components.PostsEditForm} collection="Posts"
                    title="Edit Article" redirectOnDelete="/posts"
                    deleteQuestion="Are you sure you want to delete this article?"
                    deleteTitle="Delete Article?"
                    buttonAttrs={{size: 'mini', content: 'Edit Article', compact: true}} />
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
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
registerComponent('PostsPageView', PostsPageView, withCurrentUser, [withDocument, queryOptions]);
