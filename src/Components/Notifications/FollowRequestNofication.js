import React from 'react';
import { connect } from 'react-redux';
import formatDate from '../../Helpers/formatDate';
import { API_ROOT } from '../../services/apiRoot';

const handleAccept = (props) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    alert('Must be logged in to accept follow request');
    return;
  }

  const acceptObj = {
    follow_request: {
      follower: props.content.split(' ')[0]
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(acceptObj)
  }

  fetch(`${API_ROOT}/accept-follow-request`, fetchObj)
    .then(res => res.json())
    .then(acceptResponse => {
      if (acceptResponse.message) {
        alert(acceptResponse.message);
      } else {
        props.deleteNotification(acceptResponse.notification_content)
      }
    })
}

const handleDeny = (props) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    alert('Must be logged in to deny follow request');
    return;
  }

  const denyObj = {
    follow_request: {
      follower: props.content.split(' ')[0]
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(denyObj)
  }

  fetch(`${API_ROOT}/deny-follow-request`, fetchObj)
    .then(res => res.json())
    .then(denyResponse => {
      if (denyResponse.message) {
        alert(denyResponse.message);
      } else {
        props.deleteNotification(denyResponse.notification_content)
      }
    })
}

const FollowRequestNotification = (props) => {
  return (
    <div className='notification-container'>
      <div className='notification-date'>{formatDate(props.created_at)}</div>
      <div className='notification-content'>{props.content}</div>
      <button className='follow-accept-button' onClick={() => handleAccept(props)}>Accept</button>
      <button className='follow-deny-button' onClick={() => handleDeny(props)}>Deny</button>
    </div>
  )
}

const mapDispatchToPros = (dispatch) => {
  return {
    deleteNotification: notification_content => dispatch({ type: 'DELETE_NOTIFICATION', notification_content: notification_content })
  }
}

export default connect(null, mapDispatchToPros)(FollowRequestNotification);