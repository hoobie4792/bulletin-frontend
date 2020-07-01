export default (state = {
  users: []
}, action) => {
  switch (action.type) {
    case 'GET_SEARCH_USERS':
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}