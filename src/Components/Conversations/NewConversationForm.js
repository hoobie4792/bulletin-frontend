import React, { useState } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';

const handleSearch = (e, setSearchedParticipants) => {
  e.preventDefault();

  const userObj = {
    user: {
      username: e.target.username.value
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  fetch('http://localhost:3000/api/v1/search-users', fetchObj)
    .then(res => res.json())
    .then(searchedUsers => {
      setSearchedParticipants(searchedUsers.map(user => user.username));
    })
    .catch(() => 'Something went wrong');

  e.target.reset();
}

const mapSearchedParticipants = (searchedParticipants, setSearchedParticipants, participants, setParticipants) => {
  return searchedParticipants.map(participant =>
    <ListItem button name='username' key={participant} onClick={(e) => addUserToParticipants(e, setSearchedParticipants, participants, setParticipants)}>
      <ListItemText primary={participant} />
    </ListItem>)
}

const addUserToParticipants = (e, setSearchedParticipants, participants, setParticipants) => {
  setParticipants([...participants, e.target.textContent]);
  setSearchedParticipants([]);
}

const handleNewConversation = (e, participants, props) => {
  e.preventDefault();

  const token = localStorage.getItem('auth_token');

  if (!token) {
    alert('Must be logged in to start conversation')
    return;
  }

  const conversationObj = {
    conversation: {
      participant_usernames: participants
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': token
    },
    body: JSON.stringify(conversationObj)
  }

  fetch('http://localhost:3000/api/v1/conversations', fetchObj)
    .then(res => res.json())
    .then(conversationResponse => {
      if (conversationResponse.message) {
        alert(conversationResponse.message)
      } else {
        props.addConversation(conversationResponse);
        props.loadConversation(conversationResponse, props.username, props.openConversation, props.setOpenConversation);
        props.setNewConversationDrawer(false);
      }
    })
    .catch(error => alert(`Something went wrong - ${error}`));
}

const NewConversationForm = (props) => {
  const [participants, setParticipants] = useState([]);
  const [searchedParticipants, setSearchedParticipants] = useState([]);

  return (
    <div className='new-conversation-form'>
      <div className='new-conversation-search-user-container'>
        <form className='bulletin-form-secondary' onSubmit={(e) => handleSearch(e, setSearchedParticipants)}>
          <input type='text' name='username' placeholder='Search to add a user to the conversation...' />
          <input type="submit" value='Search' />
        </form>
        <List>
          {mapSearchedParticipants(searchedParticipants, setSearchedParticipants, participants, setParticipants)}
        </List>
      </div>
      {participants.length > 0 &&
        <div className='new-participants-container'>
          <div className='new-participants-title'>Participants</div>
          <div className='new-participants'>{participants.join(', ')}</div>
        </div>
      }
      <form className='start-conversation-form' onSubmit={(e) => handleNewConversation(e, participants, props)}>
        <input className='start-conversation-button' type="submit" value='Start conversation' />
      </form>
    </div>
  )
}

const matchDispatchToProps = (dispatch) => {
  return {
    addConversation: conversation => dispatch({ type: 'ADD_CONVERSATION', conversation: conversation })
  }
}

export default connect(null, matchDispatchToProps)(NewConversationForm);