import React from 'react';
import { withRouter } from 'react-router';
import { API_ROOT } from '../../services/apiRoot';

const redirect = (history) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    history.push('/home');
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    }
  }

  fetch(`${API_ROOT}/get-username`, fetchObj)
    .then(res => res.json())
    .then(usernameResponse => {
      if (usernameResponse.username) {
        history.push(`/profile/${usernameResponse.username}`);
      } else {
        history.push('/home');
      }
    });

  return <React.Fragment />
}

const UserPageRedirect = (props) => {
  return (
    <React.Fragment>
      {redirect(props.history)}
    </React.Fragment>
  )
}

export default withRouter(UserPageRedirect);