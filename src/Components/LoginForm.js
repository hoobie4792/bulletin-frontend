import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Paper, FormControl, TextField, Button } from '@material-ui/core';
import { FormatListBulletedSharp } from '@material-ui/icons';

const handleLogin = (e, props) => {
  e.preventDefault();

  const userObj = {
    user: {
      username_email: e.target.username_email.value,
      password: e.target.password.value
    }
  }

  e.target.reset();

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  fetch('http://localhost:3000/api/v1/login', fetchObj)
    .then(res => res.json())
    .then(loginResponse => {
      if (loginResponse.token) {
        localStorage.setItem('auth_token', loginResponse.token);
        props.setLoggedIn(true);
        props.history.push('/home')
      }
      else {
        localStorage.removeItem('auth_token');
        props.setLoggedIn(FormatListBulletedSharp);
        alert(loginResponse.message);
      }
    })
    .catch(() => {
      localStorage.removeItem('auth_token');
      props.setLoggedIn(false);
      alert('Something went wrong');
    });
}

const LoginForm = (props) => {
  return (
    <form onSubmit={(e) => handleLogin(e, props)}>
      <Paper>
        <FormControl>
          <TextField name="username_email" label="Username / Email" />
          <TextField name="password" type="password" autoComplete="on" label="Password" />
          <Button type="submit">Submit</Button>
        </FormControl>
      </Paper>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: loggedIn => dispatch({ type: 'SET_LOGGED_IN', loggedIn: loggedIn })
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));