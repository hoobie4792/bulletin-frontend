export default (state = {
  messages: []
}, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return {
        ...state,
        messages: action.messages
      };
    default:
      return state;
  }
}