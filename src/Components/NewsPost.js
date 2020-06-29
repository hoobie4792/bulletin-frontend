import React from 'react';
import { Paper } from '@material-ui/core';
import PostFooter from './PostFooter';

const NewsPost = ({ post }) => {
  return (
    <Paper className='post' variant="outlined">
      <a className='post-title' href={post.news_url} target='_blank' rel="noopener noreferrer">{post.news_title}</a>
      {post.news_image && <img className='news-story-img' src={post.news_image} alt='news-story' />}
      <h4>Source: {post.news_source}</h4>
      <h4>Content: {post.content}</h4>
      <h4>Created at: {post.created_at}</h4>
      <h4>Likes: {post.likes_count}</h4>
      <p>By: {post.news_author}</p>
      <PostFooter post={post} />
    </Paper>
  )
}

export default NewsPost;