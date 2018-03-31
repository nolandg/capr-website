import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import { Item } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router';

class PostsList extends PureComponent{

  renderPostItem = (post) => {
    return (
      <Item key={post._id}>
        <Item.Image />
        <Item.Content>
          <Item.Header>{post.title}</Item.Header>
          <Item.Meta>by <Components.UsersName user={post.user} /> {moment(post.postedAt).fromNow()}</Item.Meta>
          <Item.Description>{post.excerpt}</Item.Description>
          <Item.Extra><Link to={Posts.getLink(post)} style={{}}>Read More</Link></Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  render() {
    let {results, loading} = this.props;

    if (results && results.length) {
      return (
        <div>
          <Item.Group divided>
            {results.map(post => this.renderPostItem(post))}
          </Item.Group>
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
          Nothing to show :-(
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
