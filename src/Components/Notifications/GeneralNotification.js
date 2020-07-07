import React from 'react';
import { Paper } from '@material-ui/core';

const Notification = ({ content, created_at, notification_type }) => {
  return (
    <Paper>
      <h4>Content: {content}</h4>
      <h4>Created at: {created_at}</h4>
      <h4>Type: {notification_type}</h4>
    </Paper>
  )
}

export default Notification;