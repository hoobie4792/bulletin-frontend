import React, { useState } from 'react';
import { Paper, FormControl, InputLabel, Input, Button, List, ListItem, ListItemText } from '@material-ui/core';

const handleSearch = (e, searchedParticipants, setSearchedParticipants) => {
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

const handleNewConversation = (e, participants) => {
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
        debugger;
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
        <Paper>
          <form id='new-conversation-search-user-form' onSubmit={(e) => handleSearch(e, searchedParticipants, setSearchedParticipants)}>
            <FormControl fullWidth>
              <InputLabel>Search Users</InputLabel>
              <Input name="username" placeholder='Search for a user!' />
              <Button type="submit">Search</Button>
            </FormControl>
          </form>
          <List>
            {mapSearchedParticipants(searchedParticipants, setSearchedParticipants, participants, setParticipants)}
          </List>
        </Paper>
      </div>
      <hr />
      <h3>Participants</h3>
      <p>{participants.join(', ')}</p>
      <form onSubmit={(e) => handleNewConversation(e, participants)}>
        <Paper>
          <FormControl fullWidth>
            <Button type="submit">Start Conversation</Button>
          </FormControl>
        </Paper>
      </form>
    </div>
  )
}

export default NewConversationForm;