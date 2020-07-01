export default (state = {
  searchedUsers: []
}, action) => {
  switch (action.type) {
    case 'GET_SEARCHED_USERS':
      return {
        ...state,
        searchedUsers: action.searchedUsers
      }
    default:
      return state
  }
}