import React from 'react';
import PostFooter from './PostFooter';
import formatDate from '../../Helpers/formatDate';

const NewsPost = (props) => {
  return (
    <div className='news-story-post'>
      <div className='news-story-content-container' onClick={() => window.open(props.post.news_url, '_blank')}>
        <div className='news-story-header'>
          <div className='news-story-source'>{props.post.news_source}</div>
          <div className='post-date'>{formatDate(props.post.created_at)}</div>
        </div>
        <div className='post-title' >{props.post.news_title.split(' - ')[0]}</div>
        {props.post.news_image && <img className='news-story-img' src={props.post.news_image} alt='news-story' />}
        <div className='post-content'>{props.post.content}</div>
        {props.post.news_author && <div className='news-story-author'>Written By: {props.post.news_author}</div>}
      </div>
      {props.post.reason && <div className='news-story-post-reason'>{props.post.reason}</div>}
      {!props.isSharedPost && <PostFooter post={props.post} updatePosts={props.updatePosts} />}
    </div>
  )
}

export default NewsPost;