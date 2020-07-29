import React from 'react';
import { connect } from 'react-redux';
import CommentsList from './CommentsList';
import NewCommentForm from '../../Components/Comments/NewCommentForm';

const CommentsContainer = (props) => {
  return (
    // <CommentsList comments={comments} />
    <div className='comments-container'>
      <CommentsList comments={props.post.comments} />
      {/* {props.loggedIn && <NewCommentForm post={props.post} updatePosts={props.updatePosts} />} */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedInReducer.loggedIn
  }
}

export default connect(mapStateToProps)(CommentsContainer);