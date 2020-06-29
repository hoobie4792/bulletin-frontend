import React from 'react';
import { Paper } from '@material-ui/core';

const UserPost = ({ post }) => {
  return (
    <Paper className='post' variant="outlined">
      <h4>User: {post.user.username}</h4>
      <h4>Content: {post.content}</h4>
      <h4>Created at: {post.created_at}</h4>
      <h4>Likes: {post.likes_count}</h4>
    </Paper>
  )
}

export default UserPost;