import React from 'react';
import { connect } from 'react-redux';
import { Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core';

const handleTagSearch = (e, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  const names = e.target.tags.value.split(' ')
    .map(tag => {
      if (tag[0] === '#') {
        return tag.slice(1).toLowerCase();
      } else {
        return tag.toLowerCase();
      }
    })

  const tagsObj = {
    tags: {
      names: names
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(tagsObj)
  }

  fetch('http://localhost:3000/api/v1/get-posts-by-tag', fetchObj)
    .then(res => res.json())
    .then(posts => {
      if (posts.message) {
        alert(posts.message);
      } else {
        props.getPosts(posts);
      }
    })
}

const TagSearchForm = (props) => {
  return (
    <div className='search-tag-form-container'>
      <form onSubmit={(e) => handleTagSearch(e, props)}>
        <div className='tag-search-form'>
          <input type='text' name='tags' placeholder='Search a tag...' />
          <input type='submit' value='Search' />
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (posts) => dispatch({ type: 'GET_POSTS', posts: posts })
  }
}

export default connect(null, mapDispatchToProps)(TagSearchForm);