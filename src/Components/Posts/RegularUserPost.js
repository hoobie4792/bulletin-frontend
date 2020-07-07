import React from 'react';
import { withRouter } from 'react-router';
import PostFooter from './PostFooter';
import formatDate from '../../Helpers/formatDate';

const RegularUserPost = (props) => {
  return (
    <div className='user-post'>
      <div className='user-post-content-container'>
        <div className='user-post-username' onClick={() => props.history.push(`/profile/${props.post.user.username}`)}>{props.post.user.username}</div>
        <div className='post-date'>{formatDate(props.post.created_at)}</div>
        <div className='user-post-content'>{props.post.content}</div>
      </div>
      {!props.isSharedPost && <PostFooter post={props.post} updatePosts={props.updatePosts} />}
    </div>
  )
}

export default withRouter(RegularUserPost);