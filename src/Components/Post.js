import React from 'react';
import { Paper } from '@material-ui/core';

const Post = (props) => {
  return (
    <Paper className='post' variant="outlined">
      <h4>Content: {props.post.content}</h4>
      <h4>Created at: {props.post.created_at}</h4>
      <h4>Likes: {props.post.likes_count}</h4>
    </Paper>
  )
}

export default Post;