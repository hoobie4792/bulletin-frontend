import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';
import NewsPost from './NewsPost';
import RegularUserPost from './RegularUserPost';
import { API_ROOT } from '../../services/apiRoot';

const sharePost = (e, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
    alert('Must be logged in to share a post');
    return;
  }

  const content = e.target.content.value;
  const tags = content.split(' ').filter(word => word[0] === '#').map(tag => tag.slice(1).toLowerCase())

  const sharedPostObj = {
    shared_post: {
      content: content,
      tags: tags,
      shared_post: props.post
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(sharedPostObj)
  }

  fetch(`${API_ROOT}/create-shared-post`, fetchObj)
    .then(res => res.json())
    .then(sharedPostResponse => {
      if (sharedPostResponse.message) {
        alert(sharedPostResponse.message);
      } else {
        props.createNewPost(sharedPostResponse)
        props.handleClose();
      }
    })
}

const renderSharedPost = (props) => {
  return props.post.is_news_story ?
    <NewsPost post={props.post} isSharedPost={true} updatePosts={props.updatePosts} />
    :
    <RegularUserPost post={props.post} isSharedPost={true} updatePosts={props.updatePosts} />
}

const SharePostModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <div className='bulletin-modal'>
        <form className='bulletin-form-tertiary' onSubmit={(e) => sharePost(e, props)}>
          <input type='text' name="content" placeholder='Write about this post...' />
          <input className='share-post-button' type="submit" value='Share' />
        </form>
        {renderSharedPost(props)}
      </div>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: (post) => dispatch({ type: 'CREATE_NEW_POST', post: post })
  }
}

export default connect(null, mapDispatchToProps)(SharePostModal);