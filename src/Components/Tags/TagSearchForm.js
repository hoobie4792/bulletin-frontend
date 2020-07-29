import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../../services/apiRoot';

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

  fetch(`${API_ROOT}/get-posts-by-tag`, fetchObj)
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
      <form className='bulletin-form' onSubmit={(e) => handleTagSearch(e, props)}>
        <input type='text' name='tags' placeholder='Search a tag...' />
        <input type='submit' value='Search' />
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