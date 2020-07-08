import React from 'react';

const mapParticipants = (participants) => {
  return participants.map(participant => participant.user.username).join(', ');
}

const getLastMessage = (messages) => {
  if (messages.length > 0) {
    const message = messages[messages.length - 1];
    return `${message.user.username}: ${message.content}`;
  } else {
    return '';
  }
}

const Conversation = (props) => {
  return (
    <div className='conversation-container' onClick={() => props.loadConversation(props.conversation, props.username, props.openConversation, props.setOpenConversation)} style={{ cursor: 'pointer' }}>
      {props.conversation.unread_messages_count > 0 && <div className='message-notification-badge'>{props.conversation.unread_messages_count}</div>}
      <div className='conversation-participants'>{mapParticipants(props.conversation.participants)}</div>
      <div className='conversation-last-message'>{getLastMessage(props.conversation.messages)}</div>
    </div>
  )
}

export default Conversation;