import React from "react";
import Conversation from '../../Components/Conversations/Conversation';

const mapConversations = (props) => {
  return props.conversations.map((conversation) => <Conversation
    key={conversation.id}
    conversation={conversation}
    loadConversation={props.loadConversation}
    username={props.username}
    conversationOpen={props.conversationOpen}
    setConversationOpen={props.setConversationOpen}
  />);
};

const ConversationsList = (props) => {
  return (
    <React.Fragment>
      {mapConversations(props)}
    </React.Fragment>
  );
};

export default ConversationsList;
