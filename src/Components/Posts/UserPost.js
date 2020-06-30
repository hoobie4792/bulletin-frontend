import React from 'react';
import { Paper } from '@material-ui/core';
import PostFooter from './PostFooter';

const UserPost = ({ post }) => {
  return (
    <Paper className='post' variant="outlined">
      <h4>User: <a href={`/profile/${post.user.username}`}>{post.user.username}</a></h4>
      <h4>Content: {post.content}</h4>
      <h4>Created at: {post.created_at}</h4>
      <PostFooter post={post} />
    </Paper>
  )
}

export default UserPost;