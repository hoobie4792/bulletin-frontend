import React from 'react';
import { Paper } from '@material-ui/core';

const mapParticipants = (participants) => {
  return participants.map(participant => participant.user.username).join(', ');
}

const getLastMessage = (messages) => {
  if (messages.length > 0) {
    return messages[messages.length - 1].content;
  } else {
    return '';
  }
}

const Conversation = (props) => {
  return (
    <Paper onClick={() => props.loadConversation(props.conversation, props.username, props.openConversation, props.setOpenConversation)} style={{ cursor: 'pointer' }}>
      <p>Participants: {mapParticipants(props.conversation.participants)}</p>
      <p>Last message: {getLastMessage(props.conversation.messages)}</p>
    </Paper>
  )
}

export default Conversation;