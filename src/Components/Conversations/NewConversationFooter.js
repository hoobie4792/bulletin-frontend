import React, { useState } from 'react';
import NewConversationForm from './NewConversationForm';

const NewConversationFooter = () => {
  const [newConversationDrawer, setNewConversationDrawer] = useState(false)
  return (
    <React.Fragment>
      <button onClick={() => setNewConversationDrawer(!newConversationDrawer)}>New conversation</button>
      {newConversationDrawer && <NewConversationForm />}
    </React.Fragment>
  )
}

export default NewConversationFooter;