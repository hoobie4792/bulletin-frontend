import React from 'react';
import { Paper } from '@material-ui/core';
import PostFooter from './PostFooter';

const NewsPost = (props) => {
  return (
    <Paper className='post' variant="outlined">
      <a className='post-title' href={props.post.news_url} target='_blank' rel="noopener noreferrer">{props.post.news_title}</a>
      {props.post.news_image && <img className='news-story-img' src={props.post.news_image} alt='news-story' />}
      <h4>Source: {props.post.news_source}</h4>
      <h4>Content: {props.post.content}</h4>
      <h4>Created at: {props.post.created_at}</h4>
      <p>By: {props.post.news_author}</p>
      <PostFooter post={props.post} updatePosts={props.updatePosts} />
    </Paper>
  )
}

export default NewsPost;