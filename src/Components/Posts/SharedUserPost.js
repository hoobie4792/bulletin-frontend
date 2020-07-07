import React from 'react';
import PostFooter from './PostFooter';
import NewsPost from './NewsPost';
import RegularUserPost from './RegularUserPost';
import formatDate from '../../Helpers/formatDate';

const renderSharedPost = (props) => {
  return props.post.shared_post.is_news_story ?
    <NewsPost post={props.post.shared_post} isSharedPost={true} updatePosts={props.updatePosts} />
    :
    <RegularUserPost post={props.post.shared_post} isSharedPost={true} updatePosts={props.updatePosts} />
}

const SharedUserPost = (props) => {
  return (
    <div className='user-post'>
      <div className='user-post-content-container'>
        <div className='user-post-username' onClick={() => props.history.push(`/profile/${props.post.user.username}`)}>{props.post.user.username}</div>
        <div className='user-post-content'>{props.post.content}</div>
      </div>
      <div className='shared-post-container'>
        {renderSharedPost(props)}
      </div>
      <div className='post-bottom'>
        <div className='post-date'>{formatDate(props.post.created_at)}</div>
      </div>
      <PostFooter post={props.post} updatePosts={props.updatePosts} />
    </div>
  )
}

export default SharedUserPost;