import React, { useState } from 'react';
import NewConversationForm from './NewConversationForm';

const NewConversationFooter = (props) => {
  const [newConversationDrawer, setNewConversationDrawer] = useState(false)
  return (
    <React.Fragment>
      <button onClick={() => setNewConversationDrawer(!newConversationDrawer)}>New conversation</button>
      {newConversationDrawer &&
        <NewConversationForm
          loadConversation={props.loadConversation}
          username={props.username}
          openConversation={props.openConversation}
          setOpenConversation={props.setOpenConversation}
        />}
    </React.Fragment>
  )
}

export default NewConversationFooter;