import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// Icons
import {
  HomeOutlined,
  LocalOfferOutlined,
  MessageOutlined,
  NotificationsOutlined,
  PersonOutlined
} from '@material-ui/icons';

const Menu = (props) => {
  const handleClick = (e, history) => {
    history.push(`/${e.target.textContent.toLowerCase()}`)
  }

  return (
    <div className='menu-container'>
      {props.loggedIn && (
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={e => handleClick(e, props.history)}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={e => handleClick(e, props.history)}>
            <ListItemIcon>
              <LocalOfferOutlined />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
          <ListItem button onClick={e => handleClick(e, props.history)}>
            <ListItemIcon>
              <MessageOutlined />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={e => handleClick(e, props.history)}>
            <ListItemIcon>
              <NotificationsOutlined />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button onClick={e => handleClick(e, props.history)}>
            <ListItemIcon>
              <PersonOutlined />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedInReducer.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Menu));

// const handleClick = (e, set_window) => {
//   set_window(e.target.textContent.toLowerCase())
// }

// const Menu = (props) => {
//   return (
//     <div className='menu-bar'>
//       <button onClick={e => handleClick(e, props.set_window)}>Home</button><br />
//       <button onClick={e => handleClick(e, props.set_window)}>Tags</button><br />
//       <button onClick={e => handleClick(e, props.set_window)}>Messages</button><br />
//       <button onClick={e => handleClick(e, props.set_window)}>Notifications</button><br />
//       <button onClick={e => handleClick(e, props.set_window)}>Profile</button><br />
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     window: state.window
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     set_window: (window) => dispatch({ type: 'SET_WINDOW', window: window })
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Menu);