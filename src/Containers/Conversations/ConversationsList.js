import React from "react";
import Conversation from '../../Components/Conversations/Conversation';

const mapConversations = (props) => {
  return props.conversations.map((conversation) => <Conversation
    key={conversation.id}
    conversation={conversation}
    loadConversation={props.loadConversation}
    username={props.username}
    openConversation={props.openConversation}
    setOpenConversation={props.setOpenConversation}
  />);
};

const ConversationsList = (props) => {
  return (
    <React.Fragment>
      {props.conversations.length > 0 ?
        <React.Fragment>{mapConversations(props)}</React.Fragment>
        :
        <div className='no-notifications-messages'>Looks like you don't have any messages</div>
      }
    </React.Fragment>
  );
};

export default ConversationsList;
