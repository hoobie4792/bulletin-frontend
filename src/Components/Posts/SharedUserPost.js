import React from 'react';
import { Paper } from '@material-ui/core';
import PostFooter from './PostFooter';
import NewsPost from './NewsPost';
import RegularUserPost from './RegularUserPost';

const renderSharedPost = (props) => {
  return props.post.shared_post.is_news_story ?
    <NewsPost post={props.post.shared_post} isSharedPost={true} updatePosts={props.updatePosts} />
    :
    <RegularUserPost post={props.post.shared_post} isSharedPost={true} updatePosts={props.updatePosts} />
}

const SharedUserPost = (props) => {
  return (
    <Paper className='post' variant="outlined">
      <h4>User: <a href={`/profile/${props.post.user.username}`}>{props.post.user.username}</a> shared</h4>
      <h4>Content: {props.post.content}</h4>
      <h4>Created at: {props.post.created_at}</h4>
      {renderSharedPost(props)}
      <PostFooter post={props.post} updatePosts={props.updatePosts} />
    </Paper>
  )
}

export default SharedUserPost;