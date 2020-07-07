import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

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

  fetch('http://localhost:3000/api/v1/accept-follow-request', fetchObj)
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

  fetch('http://localhost:3000/api/v1/deny-follow-request', fetchObj)
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
    <Paper>
      <h4>Content: {props.content}</h4>
      <h4>Created at: {props.created_at}</h4>
      <h4>Type: {props.notification_type}</h4>
      <button onClick={() => handleAccept(props)}>Accept</button>
      <button onClick={() => handleDeny(props)}>Deny</button>
    </Paper>
  )
}

const mapDispatchToPros = (dispatch) => {
  return {
    deleteNotification: notification_content => dispatch({ type: 'DELETE_NOTIFICATION', notification_content: notification_content })
  }
}

export default connect(null, mapDispatchToPros)(FollowRequestNotification);