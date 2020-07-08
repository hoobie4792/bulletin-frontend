import React from 'react';
import formatDate from '../../Helpers/formatDate';

const Notification = ({ content, created_at, notification_type }) => {
  return (
    <div className='notification-container'>
      <div className='notification-date'>{formatDate(created_at)}</div>
      <div className='notification-content'>{content}</div>
    </div>
  )
}

export default Notification;