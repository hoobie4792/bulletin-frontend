import React from 'react';
import Comment from '../../Components/Comments/Comment';

const mapComments = (comments) => {
  return comments.map(comment =>
    <div className='comment' key={comment.id}>
      <Comment comment={comment} />
    </div>
  )
}

const CommentsList = ({ comments }) => {
  return (
    <div className='comments-list'>
      {comments.length > 0 &&
        <React.Fragment>
          {mapComments(comments)}
        </React.Fragment>}
    </div>
  )
}

export default CommentsList;