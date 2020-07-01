import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';

const handleClick = (e, props) => {
  props.getSearchedUsers([]);
  props.history.push(`/profile/${e.target.textContent}`);
  props.history.go();
  document.querySelector('#search-users-form').reset();
}

const mapUsers = (props) => {
  return props.searchedUsers.map(user =>
    <ListItem button name='username' key={user.username} onClick={(e) => handleClick(e, props)}>
      <ListItemText primary={user.username} />
    </ListItem>
  )
}

const FindUserList = (props) => {
  return (
    <List>
      {mapUsers(props)}
    </List>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchedUsers: searchedUsers => dispatch({ type: 'GET_SEARCHED_USERS', searchedUsers: searchedUsers })
  }
}

export default withRouter(connect(null, mapDispatchToProps)(FindUserList));