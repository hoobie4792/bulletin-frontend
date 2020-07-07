import React from 'react';
import { connect } from 'react-redux';

const handleNewPost = (e, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
    return;
  }

  const content = e.target.content.value;
  const tags = content.split(' ').filter(word => word[0] === '#').map(tag => tag.slice(1).toLowerCase())

  const postObj = {
    post: {
      content: content,
      tags: tags
    }
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
    <div className='new-post-form-container'>
      <form className='bulletin-form' onSubmit={(e) => handleNewPost(e, props)}>
        <input type='text' name='content' placeholder='Write a new post...' />
        <input type='submit' value='Post' />
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: (post) => dispatch({ type: 'CREATE_NEW_POST', post: post })
  }
}

export default connect(null, mapDispatchToProps)(NewPostForm);