export default (state = {
  notifications: []
}, action) => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.notifications
      }
    default:
      return {
        ...state
      }
  }
}