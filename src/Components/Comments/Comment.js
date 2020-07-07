import React from 'react';
import { withRouter } from 'react-router';
import formatDate from '../../Helpers/formatDate';

const Comment = (props) => {
  return (
    <React.Fragment>
      <div className='comment-user' onClick={() => props.history.push(`/profile/${props.comment.user.username}`)}>{props.comment.user.username}</div>
      <div className='comment-content'>{props.comment.content}</div>
      <div className='comment-date'>{formatDate(props.comment.created_at)}</div>
    </React.Fragment>
  )
}

export default withRouter(Comment);