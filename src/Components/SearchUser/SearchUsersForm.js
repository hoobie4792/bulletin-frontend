import React from 'react';
import { Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core';

const handleSearch = (e) => {
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
    .then(searchResponse => {

    })
    .catch(() => 'Something went wrong');
}

const FindUserForm = () => {
  return (
    <React.Fragment>
      <form onSubmit={(e) => handleSearch(e)}>
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

export default FindUserForm;