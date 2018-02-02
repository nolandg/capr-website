import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Posts } from '../../modules/posts/index.js';
import classNames from 'classnames';
import { Loader, Item } from 'semantic-ui-react';
import moment from 'moment';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

class PostsList extends PureComponent{

  renderPostItem = (post) => {
    return (
      <Item key={post._id}>
        <Item.Image />
        <Item.Content>
          <Item.Header>{post.title}</Item.Header>
          <Item.Meta>by {Users.getDisplayName(post.user)} {moment(new Date(post.postedAt)).fromNow()}</Item.Meta>
          <Item.Description>{post.excerpt}</Item.Description>
          <Item.Extra><Link to={Posts.getLink(post)} style={{}}>Read More</Link></Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  render() {
    let {className, results, loading, count, totalCount, loadMore, showLoadMore = true, networkStatus} = this.props;

    const loadingMore = networkStatus === 2;

    if (results && results.length) {

      const hasMore = totalCount > results.length;

      return (
        <div>
          <Item.Group>
            {results.map(post => this.renderPostItem(post))}
          </Item.Group>
          {showLoadMore ?
            hasMore ?
              <Components.PostsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} /> :
              <Components.PostsNoMore/> :
            null
          }
        </div>
      )
    } else if (loading) {
      return (
        <div className={classNames(className, 'posts-list')}>
          <Loader />
        </div>
      )
    } else {
      return (
        <div>
          Nothing to show :-(
        </div>
      )
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
};

registerComponent('PostsList', PostsList, withCurrentUser, [withList, options]);
