import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Item } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router';
import Users from 'meteor/vulcan:users';

class PostsList extends PureComponent{

  renderPostItem = (post) => {
    return (
      <Item key={post._id}>
        <Item.Image />
        <Item.Content>
          <Item.Header>{post.title}</Item.Header>
          <Item.Meta>posted by <Components.UsersName user={post.user} /> {moment(post.createdAt).fromNow()}</Item.Meta>
          <Item.Description>{post.excerpt.replace('&nbsp;', '')}</Item.Description>
          <Item.Extra><Link to={Posts.getLink(post)} style={{}}>Read More</Link></Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  render() {
    let {results, loading, terms} = this.props;

    const addPostButton = Users.canDo(this.props.currentUser, 'posts.new') ?
      <Components.EditModal component={Components.PostsEditForm} collection='Posts' tag={terms.tag}
        title="New Content" buttonAttrs={{icon: 'plus', content: 'Add New Content', color: 'blue'}} />:null;

    if (results && results.length) {
      return (
        <div>
          {addPostButton}
          <Item.Group divided>
            {results.map(post => this.renderPostItem(post))}
          </Item.Group>
          {addPostButton}
        </div>
      );
    } else if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    } else {
      return (
        <div>
          No content yet :-( <br /><br />
          {addPostButton}
        </div>
      );
    }

  }
}

PostsList.displayName = "PostsList";

PostsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
  limit: 100,
};

registerComponent('PostsList', PostsList, withCurrentUser, [withList, options]);
