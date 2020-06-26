export default (state = {
  loggedIn: false
}, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    default:
      return state;
  }
}