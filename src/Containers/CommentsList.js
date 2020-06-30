import React from 'react';
import Comment from '../Components/Comment';
import { Paper } from '@material-ui/core'

const mapComments = (comments) => {
  return comments.map(comment =>
    <Paper key={comment.id}>
      <Comment comment={comment} />
    </Paper>
  )
}

const CommentsList = ({ comments }) => {
  return (
    <React.Fragment>
      <h4>Comments</h4>
      {mapComments(comments)}
    </React.Fragment>
  )
}

export default CommentsList;