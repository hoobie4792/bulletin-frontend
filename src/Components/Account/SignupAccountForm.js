import React from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { API_ROOT } from '../../services/apiRoot';

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

  fetch(`${API_ROOT}/signup`, fetchObj)
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
    <div className='account-form-container'>
      <h2>Signup</h2>
      <form className='account-form' onSubmit={(e) => handleSignup(e, props)}>
        <div className='account-label'>Email:</div>
        <input type='text' name="email" />
        <div className='account-label'>Username:</div>
        <input type='text' name="username" />
        <div className='account-label'>Bio:</div>
        <input type='text' name="bio" />
        <div className='account-label'>Password:</div>
        <input type='password' name="password" autoComplete="on" />
        <div className='account-label'>Password Confirmation:</div>
        <input type='password' name="passwordConfirmation" autoComplete="on" />
        <FormControlLabel
          control={<Checkbox style={{ color: '#3d6081' }} name="isPrivate" color="primary" />}
          label="Private Account"
        />
        <input type="submit" value='Submit' />
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: loggedIn => dispatch({ type: 'SET_LOGGED_IN', loggedIn: loggedIn })
  }
}

export default connect(null, mapDispatchToProps)(SignupAccountForm);