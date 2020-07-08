export default (state = {
  notifications: 0,
  messages: 0
}, action) => {
  switch (action.type) {
    case 'GET_BADGES':
      return {
        ...state,
        notifications: action.notifications,
        messages: action.messages
      }
    case 'SET_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: 0
      }
    case 'SET_MESSAGES_BADGE_COUNT':
      return {
        ...state,
        messages: action.messagesCount
      }
    default:
      return state;
  }
}