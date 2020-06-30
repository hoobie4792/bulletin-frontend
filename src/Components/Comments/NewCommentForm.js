import React from 'react';
import { connect } from 'react-redux';
import { Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core';

const handleNewComment = (e, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
    return;
  }

  const commentObj = {
    comment: { content: e.target.content.value },
    post: props.post
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(commentObj)
  }

  fetch('http://localhost:3000/api/v1/comments', fetchObj)
    .then(res => res.json())
    .then(post => {
      if (post.message) {
        alert(post.message);
      } else {
        props.updatePosts(post);
      }
    })
    .catch(() => alert('Something went wrong'))

  e.target.reset();
}

const NewCommentForm = (props) => {
  return (
    <form onSubmit={(e) => handleNewComment(e, props)}>
      <Paper>
        <FormControl fullWidth>
          <InputLabel>Write Comment</InputLabel>
          <Input name="content" placeholder='Write a comment!' />
          <Button type="submit">Submit</Button>
        </FormControl>
      </Paper>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePosts: (post) => dispatch({ type: 'UPDATE_POSTS', post: post })
  }
}

export default connect(null, mapDispatchToProps)(NewCommentForm);