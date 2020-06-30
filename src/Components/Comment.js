import React from 'react';

const Comment = ({ comment }) => {
  return (
    <React.Fragment>
      <p>User: {comment.user.username}</p>
      <p>Content: {comment.content}</p>
      <p>Date: {comment.created_at}</p>
    </React.Fragment>
  )
}

export default Comment;