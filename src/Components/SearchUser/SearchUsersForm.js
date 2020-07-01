import React from 'react';
import { connect } from 'react-redux';
import { Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core';

const handleSearch = (e, props) => {
  e.preventDefault();

  const userObj = {
    user: {
      username: e.target.username.value
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  fetch('http://localhost:3000/api/v1/search-users', fetchObj)
    .then(res => res.json())
    .then(searchedUsers => {
      props.getSearchedUsers(searchedUsers)
    })
    .catch(() => 'Something went wrong');
}

const FindUserForm = (props) => {
  return (
    <React.Fragment>
      <form id='search-users-form' onSubmit={(e) => handleSearch(e, props)}>
        <Paper>
          <FormControl fullWidth>
            <InputLabel>Search Users</InputLabel>
            <Input name="username" placeholder='Search for a user!' />
            <Button type="submit">Search</Button>
          </FormControl>
        </Paper>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    searchedUsers: state.searchedUsersReducer.searchedUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchedUsers: searchedUsers => dispatch({ type: 'GET_SEARCHED_USERS', searchedUsers: searchedUsers })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindUserForm);