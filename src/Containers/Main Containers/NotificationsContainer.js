import React from 'react';
import { connect } from 'react-redux';
import GeneralNotification from '../../Components/Notifications/GeneralNotification';
import FollowRequestNotification from '../../Components/Notifications/FollowRequestNofication';

class NotificationsContainer extends React.Component {
  componentDidMount() {
    this.fetchNotifications()
  }

  fetchNotifications = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Must be signed in to see notifications');
      return
    }

    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      }
    }

    fetch('http://localhost:3000/api/v1/notifications', fetchObj)
      .then(res => res.json())
      .then(notifications => {
        if (notifications.message) {
          alert(notifications.message)
        } else {
          this.props.getNotifications(notifications);
          this.props.setNotificationsRead();
        }
      })
      .catch(() => 'Something went wrong');
  }

  mapNotifications = () => {
    return this.props.notifications.map(notification => {
      switch (notification.notification_type) {
        case 'general':
          return <GeneralNotification
            key={notification.id}
            content={notification.content}
            created_at={notification.created_at}
            id={notification.id}
            notification_type={notification.notification_type}
          />
        case 'follow request':
          return <FollowRequestNotification
            key={notification.id}
            content={notification.content}
            created_at={notification.created_at}
            id={notification.id}
            notification_type={notification.notification_type}
          />
        default:
          return <GeneralNotification
            key={notification.id}
            content={notification.content}
            created_at={notification.created_at}
            id={notification.id}
            notification_type={notification.notification_type}
          />
      }
    })
  }

  render() {
    return (
      <div className='notifications-container'>
        {this.props.notifications.length > 0 ?
          <React.Fragment>{this.mapNotifications()}</React.Fragment>
          :
          <div className='no-notifications-messages'>Looks like you don't have any notifications</div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notificationsReducer.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (notifications) => dispatch({ type: 'GET_NOTIFICATIONS', notifications: notifications }),
    setNotificationsRead: () => dispatch({ type: 'SET_NOTIFICATIONS_READ' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);