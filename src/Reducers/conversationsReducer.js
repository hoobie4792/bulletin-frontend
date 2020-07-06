export default (
  state = {
    username: '',
    conversations: [],
    openConversation: null
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
    case "SET_OPEN_CONVERSATION":
      return {
        ...state,
        openConversation: action.conversation
      }
    case 'ADD_MESSAGE_TO_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conversation => {
          if (conversation.id === action.conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, action.message]
            };
          } else {
            return conversation;
          }
        })
      }
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [...state.conversations, action.conversation]
      }
    default:
      return state;
  }
};
