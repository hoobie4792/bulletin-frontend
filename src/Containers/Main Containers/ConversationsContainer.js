import React from 'react';
import { connect } from 'react-redux';
import ConversationsList from '../Conversations/ConversationsList';
import NewConversationFooter from '../../Components/Conversations/NewConversationFooter';
import { Widget, deleteMessages, addResponseMessage, addUserMessage, markAllAsRead, toggleWidget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css';

class ConversationsContainer extends React.Component {
  componentDidMount() {
    this.fetchConversations();
  }

  fetchConversations = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Must be logged in to see conversations');
      return;
    }

    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
    };

    fetch('http://localhost:3000/api/v1/conversations', fetchObj)
      .then((res) => res.json())
      .then((conversationData) => {
        if (conversationData.message) {
          alert(conversationData.message);
        } else {
          this.props.getConversations(conversationData.username, conversationData.conversations);
        }
      })
      .catch((error) => alert('Something went wrong ' + error));
  };

  loadConversation = (conversation, username, openConversation, setOpenConversation) => {
    deleteMessages();
    conversation.messages.forEach(message => {
      if (message.user.username === username) {
        addUserMessage(message.content);
      } else {
        if (conversation.participants.length > 2) {
          addResponseMessage(`${message.user.username} --- ${message.content}`);
        } else {
          addResponseMessage(message.content)
        }
      }
    })
    markAllAsRead();
    if (!openConversation) {
      setOpenConversation(conversation);
      toggleWidget();
    }
  }

  getCustomLauncher = (handleToggle, openConversation, setOpenConversation) => {
    return (openConversation && <button className='close-chat-button' onClick={() => this.handleChatClose(handleToggle, setOpenConversation)}>Close Chat</button>)
  }

  handleChatClose = (handleToggle, setOpenConversation) => {
    handleToggle();
    setOpenConversation(null);
  }

  handleNewUserMessage = (content) => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Must be logged in to send messages');
      return;
    }

    const messageObj = {
      message: {
        content: content,
        conversation_id: this.props.openConversation.id
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
      body: JSON.stringify(messageObj)
    };

    fetch('http://localhost:3000/api/v1/messages', fetchObj)
      .then((res) => res.json())
      .then((messageResponse) => {
        if (messageResponse.message) {
          alert(messageResponse.message);
        } else {
          this.props.addMessageToConversation(messageResponse, this.props.openConversation.id)
        }
      })
      .catch((error) => alert('Something went wrong ' + error));
  }

  render() {
    return (
      <div className='conversations-container'>
        <ConversationsList
          conversations={this.props.conversations}
          loadConversation={this.loadConversation}
          username={this.props.username}
          openConversation={this.props.openConversation}
          setOpenConversation={this.props.setOpenConversation}
        />
        <NewConversationFooter
          loadConversation={this.loadConversation}
          username={this.props.username}
          openConversation={this.props.openConversation}
          setOpenConversation={this.props.setOpenConversation}
        />
        <Widget
          title='Bulletin Chat'
          subtitle=''
          handleNewUserMessage={this.handleNewUserMessage}
          showCloseButton={true}
          showTimeStamp={false}
          launcher={handleToggle => this.getCustomLauncher(handleToggle, this.props.openConversation, this.props.setOpenConversation)}
          senderPlaceHolder='Send a message...'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.conversationsReducer.username,
    conversations: state.conversationsReducer.conversations,
    openConversation: state.conversationsReducer.openConversation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (username, conversations) => dispatch({ type: 'GET_CONVERSATIONS', username: username, conversations: conversations }),
    setOpenConversation: conversation => dispatch({ type: 'SET_OPEN_CONVERSATION', conversation: conversation }),
    addMessageToConversation: (message, conversationId) => dispatch({ type: 'ADD_MESSAGE_TO_CONVERSATION', message: message, conversationId: conversationId })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationsContainer);
