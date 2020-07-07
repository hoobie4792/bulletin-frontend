import React from 'react';

const handleNewComment = (e, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
    alert('Must be logged in to write comment');
    e.target.reset();
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
    .catch((error) => alert('Something went wrong' + error))

  e.target.reset();
}

const NewCommentForm = (props) => {
  return (
    <div className='new-comment-form-container'>
      <form className='new-comment-form' onSubmit={(e) => handleNewComment(e, props)}>
        <div className='comment-form'>
          <input name="content" placeholder='Write a comment...' />
        </div>
      </form>
    </div>
  )
}

export default NewCommentForm;