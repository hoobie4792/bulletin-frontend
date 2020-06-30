import React from 'react';
import CommentsList from './CommentsList';
import NewCommentForm from '../../Components/Comments/NewCommentForm';

const CommentsContainer = ({ post }) => {
  return (
    // <CommentsList comments={comments} />
    <React.Fragment>
      <CommentsList comments={post.comments} />
      <NewCommentForm post={post} />
    </React.Fragment>
  )
}

export default CommentsContainer;