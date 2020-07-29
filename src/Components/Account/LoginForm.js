import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { API_ROOT } from '../../services/apiRoot';

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

  fetch(`${API_ROOT}/login`, fetchObj)
    .then(res => res.json())
    .then(loginResponse => {
      if (loginResponse.token) {
        localStorage.setItem('auth_token', loginResponse.token);
        props.setLoggedIn(true);
        props.history.push('/home');
        props.history.go();
      }
      else {
        localStorage.removeItem('auth_token');
        props.setLoggedIn(false);
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
    <div className='account-form-container'>
      <h2>Login</h2>
      <form className='account-form' onSubmit={(e) => handleLogin(e, props)}>
        <div className='account-label'>Username / Email:</div>
        <input type='text' name="username_email" />
        <div className='account-label'>Password:</div>
        <input type='password' name="password" autoComplete="on" />
        <input type="submit" value='Login' />
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: loggedIn => dispatch({ type: 'SET_LOGGED_IN', loggedIn: loggedIn })
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));