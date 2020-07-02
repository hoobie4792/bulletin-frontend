export default (
  state = {
    username: '',
    conversations: []
  },
  action
) => {
  switch (action.type) {
    case "GET_CONVERSATIONS":
      return {
        ...state,
        username: action.username,
        conversations: action.conversations
      };
    default:
      return state;
  }
};
