import { Components, registerComponent, ModalTrigger } from 'meteor/vulcan:core';
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { Posts } from '../../modules/posts/index.js';
import moment from 'moment';
import { Modal, Button, Icon } from 'semantic-ui-react'

class PostsEditModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  registerActions = (actions) => {
    this.formActions = actions;
  }

  handleSave = () => {
    this.formActions.submit();
  }

  handleDelete = () => {
    console.log('delete')
    this.formActions.delete();
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}><Icon name='write' />Edit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer="blurring"
      >
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Components.PostsEditForm post={this.props.post} closeModal={this.handleClose} registerActions={this.registerActions} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={this.handleClose}><Icon name='cancel' />Cancel</Button>
          <Button color='red' onClick={this.handleDelete}><Icon name='trash' />Delete</Button>
          <Button color='green' onClick={this.handleSave}><Icon name='save' />Save</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

class PostsItem extends PureComponent {

  renderCategories() {
    return this.props.post.categories && this.props.post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commenters && this.props.post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post}/> : "";
  }

  renderActions() {
    return (
      <div className="posts-actions">
        <PostsEditModal post={this.props.post} />
        <ModalTrigger title="Edit Post" component={<a className="posts-action-edit"><FormattedMessage id="posts.edit"/></a>}>
          <Components.PostsEditForm post={this.props.post} />
        </ModalTrigger>
      </div>
    )
  }

  render() {

    const {post} = this.props;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Components.Vote collection={Posts} document={post} currentUser={this.props.currentUser} />
        </div>

        {post.thumbnailUrl ? <Components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">

          <h3 className="posts-item-title">
            <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
            {this.renderCategories()}
          </h3>

          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Components.UsersAvatar user={post.user} size="small"/><Components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date">{post.postedAt ? moment(new Date(post.postedAt)).fromNow() : <FormattedMessage id="posts.dateNotDefined"/>}</div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                {!post.commentCount || post.commentCount === 0 ? <FormattedMessage id="comments.count_0"/> :
                  post.commentCount === 1 ? <FormattedMessage id="comments.count_1" /> :
                    <FormattedMessage id="comments.count_2" values={{count: post.commentCount}}/>
                }
              </Link>
            </div>
            {this.props.currentUser && this.props.currentUser.isAdmin ? <Components.PostsStats post={post} /> : null}
            {Posts.options.mutations.edit.check(this.props.currentUser, post) ? this.renderActions() : null}
          </div>

        </div>

        {this.renderCommenters()}

      </div>
    )
  }
}

PostsItem.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('PostsItem', PostsItem);
