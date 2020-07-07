import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InterestsNewsSourcesMenu from './InterestsNewsSourcesMenu';

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
      <List component="nav" style={{ position: 'fixed', width: '20%' }}>
        <ListItem button onClick={e => handleClick(e, props)}>
          <ListItemIcon>
            <HomeOutlined style={{ color: '#8798A5' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={e => handleClick(e, props)}>
          <ListItemIcon>
            <LocalOfferOutlined style={{ color: '#8798A5' }} />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItem>
        {props.loggedIn && (
          <React.Fragment>
            <ListItem button onClick={e => handleClick(e, props)}>
              <ListItemIcon>
                <MessageOutlined style={{ color: '#8798A5' }} />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button onClick={e => handleClick(e, props)}>
              <ListItemIcon>
                <NotificationsOutlined style={{ color: '#8798A5' }} />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={e => handleClick(e, props)}>
              <ListItemIcon>
                <PersonOutlined style={{ color: '#8798A5' }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <hr />
            <InterestsNewsSourcesMenu />
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