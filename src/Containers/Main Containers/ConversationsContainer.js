import React from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import ConversationsSearchForm from "../../Components/Conversations/ConversationsSearchForm";
import ConversationsList from "../Conversations/ConversationsList";
import { Widget, deleteMessages, addResponseMessage, addUserMessage, markAllAsRead, toggleWidget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css';

class ConversationsContainer extends React.Component {
  componentDidMount() {
    this.fetchConversations();
  }

  fetchConversations = () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      alert("Must be logged in to see conversations");
      return;
    }

    const fetchObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token,
      },
    };

    fetch("http://localhost:3000/api/v1/conversations", fetchObj)
      .then((res) => res.json())
      .then((conversationData) => {
        if (conversationData.message) {
          alert(conversationData.message);
        } else {
          this.props.getConversations(conversationData.username, conversationData.conversations);
        }
      })
      .catch((error) => alert("Something went wrong " + error));
  };

  loadConversation = (conversation, username, conversationOpen, setConversationOpen) => {
    deleteMessages();
    conversation.messages.forEach(message => {
      if (message.user.username === username) {
        addUserMessage(message.content);
      } else {
        addResponseMessage(message.content);
      }
    })
    markAllAsRead();
    if (!conversationOpen) {
      setConversationOpen(true);
      toggleWidget();
    }
  }

  handleNewUserMessage = (message) => {
    console.log(message);
  }

  getCustomLauncher = (handleToggle, conversationOpen, setConversationOpen) => {
    return (conversationOpen && <button className='close-chat-button' onClick={() => this.handleChatClose(handleToggle, setConversationOpen)}>Close Chat</button>)
  }

  handleChatClose = (handleToggle, setConversationOpen) => {
    handleToggle();
    setConversationOpen(false);
  }

  render() {
    return (
      <Paper>
        <ConversationsSearchForm conversations={this.props.conversations} />
        <ConversationsList
          conversations={this.props.conversations}
          loadConversation={this.loadConversation}
          username={this.props.username}
          conversationOpen={this.props.conversationOpen}
          setConversationOpen={this.props.setConversationOpen}
        />
        <Widget
          title='Bulletin Chat'
          subtitle=''
          handleNewUserMessage={this.handleNewUserMessage}
          showCloseButton={true}
          showTimeStamp={false}
          launcher={handleToggle => this.getCustomLauncher(handleToggle, this.props.conversationOpen, this.props.setConversationOpen)}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.conversationsReducer.username,
    conversations: state.conversationsReducer.conversations,
    conversationOpen: state.conversationsReducer.conversationOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (username, conversations) => dispatch({ type: "GET_CONVERSATIONS", username: username, conversations: conversations }),
    setConversationOpen: value => dispatch({ type: 'SET_CONVERSATION_OPEN', value: value })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationsContainer);
