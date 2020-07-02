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

const handleClick = (e, props) => {
  props.history.push(`/${e.target.textContent.toLowerCase()}`)
}

const Menu = (props) => {
  return (
    <div className='menu-container'>
      <List component="nav" style={{ position: 'fixed' }}>
        <ListItem button onClick={e => handleClick(e, props)}>
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={e => handleClick(e, props)}>
          <ListItemIcon>
            <LocalOfferOutlined />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItem>
        {props.loggedIn && (
          <React.Fragment>
            <ListItem button onClick={e => handleClick(e, props)}>
              <ListItemIcon>
                <MessageOutlined />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button onClick={e => handleClick(e, props)}>
              <ListItemIcon>
                <NotificationsOutlined />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={e => handleClick(e, props)}>
              <ListItemIcon>
                <PersonOutlined />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </React.Fragment>
        )}
      </List>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedInReducer.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Menu));