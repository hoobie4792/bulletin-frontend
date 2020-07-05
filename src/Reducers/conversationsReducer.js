export default (
  state = {
    username: '',
    conversations: [],
    conversationOpen: false
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
    case "SET_CONVERSATION_OPEN":
      return {
        ...state,
        conversationOpen: action.value
      }
    default:
      return state;
  }
};
