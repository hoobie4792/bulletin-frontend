import React from 'react';
import { connect } from 'react-redux';
import { Paper, FormControl, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';

const handleSignup = (e, props) => {
  e.preventDefault();

  const userObj = {
    user: {
      email: e.target.email.value,
      username: e.target.username.value,
      bio: e.target.bio.value,
      password: e.target.password.value,
      password_confirmation: e.target.passwordConfirmation.value,
      is_private: e.target.isPrivate.checked
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

  fetch('http://localhost:3000/api/v1/signup', fetchObj)
    .then(res => res.json())
    .then(signupResponse => {
      if (signupResponse.token) {
        localStorage.setItem('auth_token', signupResponse.token);
        props.setLoggedIn(true);
        props.setPickInterestsSources(!props.pickInterestsSources);
      }
      else {
        localStorage.removeItem('auth_token');
        props.setLoggedIn(false);
        alert(signupResponse.message);
      }
    })
    .catch(() => {
      localStorage.removeItem('auth_token');
      props.setLoggedIn(false);
      alert('Something went wrong');
    });
}

const SignupAccountForm = (props) => {
  return (
    <form onSubmit={(e) => handleSignup(e, props)}>
      <Paper>
        <FormControl>
          <TextField name="email" label="Email" />
          <TextField name="username" label="Username" />
          <TextField name="bio" label="Bio" />
          <TextField name="password" type="password" autoComplete="on" label="Password" />
          <TextField name="passwordConfirmation" type="password" autoComplete="on" label="Password Confirmation" />
          <FormControlLabel
            control={<Checkbox name="isPrivate" color="primary" />}
            label="Private Account"
          />
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

export default connect(null, mapDispatchToProps)(SignupAccountForm);