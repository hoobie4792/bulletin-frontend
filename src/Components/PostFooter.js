import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from '@material-ui/core';
import { ThumbUpOutlined, ChatOutlined } from '@material-ui/icons';

const likePost = (post) => {

}

const PostFooter = ({ post }) => {
  return (
    <div className='post-footer'>
      <Button className='post-footer-button' onClick={() => likePost(post)}>
        <Icon>
          <ThumbUpOutlined />
        </Icon>
      </Button>
      <span>{post.likes_count}</span>
      <Button className='post-footer-button'>
        <Icon>
          <ChatOutlined />
        </Icon>
      </Button>
    </div>
  );
}

export default PostFooter