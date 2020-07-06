import React from 'react';
import { connect } from 'react-redux';
import { Modal, Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import NewsPost from './NewsPost';
import RegularUserPost from './RegularUserPost';

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

  fetch('http://localhost:3000/api/v1/create-shared-post', fetchObj)
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
        <form onSubmit={(e) => sharePost(e, props)}>
          <Paper>
            <FormControl fullWidth>
              <InputLabel>New Post</InputLabel>
              <Input name="content" placeholder='Write a new post!' />
              <Button type="submit">Share</Button>
            </FormControl>
          </Paper>
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