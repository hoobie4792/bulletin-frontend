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
    <form onSubmit={(e) => handleTagSearch(e, props)}>
      <Paper>
        <FormControl fullWidth>
          <InputLabel>Tag Search</InputLabel>
          <Input name="tags" placeholder='Search for a tag!' />
          <Button type="submit">Search</Button>
        </FormControl>
      </Paper>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (posts) => dispatch({ type: 'GET_POSTS', posts: posts })
  }
}

export default connect(null, mapDispatchToProps)(TagSearchForm);