export default (state = {
  user: {}
}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'UPDATE_FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: action.following
        }
      }
    default:
      return state;
  }
}