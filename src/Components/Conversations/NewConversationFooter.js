import React, { useState } from 'react';
import NewConversationForm from './NewConversationForm';

const NewConversationFooter = (props) => {
  const [newConversationDrawer, setNewConversationDrawer] = useState(false)
  return (
    <React.Fragment>
      <button className='new-conversation-button' onClick={() => setNewConversationDrawer(!newConversationDrawer)}>Start a new conversation</button>
      {newConversationDrawer &&
        <NewConversationForm
          loadConversation={props.loadConversation}
          username={props.username}
          openConversation={props.openConversation}
          setOpenConversation={props.setOpenConversation}
          setNewConversationDrawer={setNewConversationDrawer}
        />}
    </React.Fragment>
  )
}

export default NewConversationFooter;