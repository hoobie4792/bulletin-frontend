import React from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import ConversationsSearchForm from "../../Components/Conversations/ConversationsSearchForm";
import ConversationsList from "../Conversations/ConversationsList";
import { Widget } from 'react-chat-widget';
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

  loadConversation = (conversation) => {
    debugger;
  }

  render() {
    return (
      <Paper>
        <ConversationsSearchForm conversations={this.props.conversations} />
        <ConversationsList conversations={this.props.conversations} loadConversation={this.loadConversation} />
        <Widget />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conversations: state.conversationsReducer.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (username, conversations) => dispatch({ type: "GET_CONVERSATIONS", username: username, conversations: conversations }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationsContainer);
