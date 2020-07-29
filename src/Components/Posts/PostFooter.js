import React, { useState } from 'react';
import CommentsContainer from '../../Containers/Comments/CommentsContainer';
import { Button, Icon } from '@material-ui/core';
import { ThumbUpOutlined, ChatOutlined, ShareOutlined } from '@material-ui/icons';
import SharePostModal from './SharePostModal';
import { API_ROOT } from '../../services/apiRoot';

const likePost = (props) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    alert('Must be logged in to like post');
    return;
  }

  const postObj = {
    post: props.post
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(postObj)
  }

  fetch(`${API_ROOT}/likes`, fetchObj)
    .then(res => res.json())
    .then(postResponse => {
      if (postResponse.message) {
        alert(postResponse.message);
      } else {
        props.updatePosts(postResponse)
      }
    })
    .catch((error) => alert('Something went wrong ' + error))
}

const PostFooter = (props) => {
  const [commentDrawerOpen, setCommentDrawer] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className='post-footer'>
      <Button style={{ color: '#8798A5' }} onClick={() => likePost(props)}>
        <Icon className='post-icon'>
          <ThumbUpOutlined />
        </Icon>
      </Button>
      <span className='post-count'>{props.post.likes_count}</span>
      <Button style={{ color: '#8798A5' }} onClick={() => setCommentDrawer(!commentDrawerOpen)}>
        <Icon className='post-icon'>
          <ChatOutlined />
        </Icon>
      </Button>
      <span>{props.post.comments.length}</span>
      <Button style={{ color: '#8798A5', float: 'right' }} onClick={() => setModalOpen(true)}>
        <Icon className='post-icon'>
          <ShareOutlined />
        </Icon>
      </Button>
      {commentDrawerOpen && <CommentsContainer post={props.post} updatePosts={props.updatePosts} />}
      {modalOpen && <SharePostModal open={modalOpen} handleClose={() => setModalOpen(false)} post={props.post} updatePosts={props.updatePosts} />}
    </div>
  );
}

export default PostFooter;