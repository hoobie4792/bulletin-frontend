import React from 'react';
import { Paper } from '@material-ui/core';
import PostFooter from './PostFooter';

const UserPost = (props) => {
  return (
    <Paper className='post' variant="outlined">
      <h4>User: <a href={`/profile/${props.post.user.username}`}>{props.post.user.username}</a></h4>
      <h4>Content: {props.post.content}</h4>
      <h4>Created at: {props.post.created_at}</h4>
      <PostFooter post={props.post} updatePosts={props.updatePosts} />
    </Paper>
  )
}

export default UserPost;