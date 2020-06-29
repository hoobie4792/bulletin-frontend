import React from 'react';
import { connect } from 'react-redux';
import { Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core'

const handleNewPost = (e, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
    return;
  }

  const postObj = {
    content: e.target.content.value
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(postObj)
  }

  fetch('http://localhost:3000/api/v1/posts', fetchObj)
    .then(res => res.json())
    .then(post => {
      if (post.message) {
        alert(post.message);
      } else {
        props.createNewPost(post);
      }
    })
    .catch(() => alert('Something went wrong'))

  e.target.reset();
}

const NewPostForm = (props) => {
  return (
    <form onSubmit={(e) => handleNewPost(e, props)}>
      <Paper>
        <FormControl fullWidth>
          <InputLabel>New Post</InputLabel>
          <Input name="content" placeholder='Write a new post!' />
          <Button type="submit">Post</Button>
        </FormControl>
      </Paper>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: (post) => dispatch({ type: 'CREATE_NEW_POST', post: post })
  }
}

export default connect(null, mapDispatchToProps)(NewPostForm);