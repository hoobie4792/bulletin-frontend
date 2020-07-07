export default (state = {
  notifications: []
}, action) => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.notifications
      }
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications].filter(notification => notification.content !== action.notification_content)
      }
    default:
      return {
        ...state
      }
  }
}