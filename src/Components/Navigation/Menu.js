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

class Menu extends React.Component {
  componentDidMount() {
    this.getBadgeCounts();
  }

  getBadgeCounts = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return;
    }

    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      }
    }

    fetch('http://localhost:3000/api/v1/get-badges', fetchObj)
      .then(res => res.json())
      .then(badgesResponse => {
        if (!badgesResponse.message) {
          this.props.getBadges(badgesResponse.notifications, badgesResponse.messages)
        }
      })
  }

  handleClick = (e) => {
    this.props.history.push(`/${e.target.textContent.toLowerCase()}`)
  }

  render() {
    return (
      <div className='menu-container'>
        <List className='hidden-scroll' component="nav" style={{ position: 'fixed', width: '20%', maxHeight: '80vh', overflowY: 'scroll' }}>
          <ListItem button onClick={e => this.handleClick(e)}>
            <ListItemIcon>
              <HomeOutlined style={{ color: '#FDFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={e => this.handleClick(e)}>
            <ListItemIcon>
              <LocalOfferOutlined style={{ color: '#FDFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
          {this.props.loggedIn && (
            <React.Fragment>
              <ListItem button onClick={e => this.handleClick(e)}>
                <ListItemIcon>
                  <MessageOutlined style={{ color: '#FDFFFF' }} />
                </ListItemIcon>
                <ListItemText primary="Messages" />
                {this.props.messagesCount > 0 && <div className='notification-badge'>{this.props.messagesCount}</div>}
              </ListItem>
              <ListItem button onClick={e => this.handleClick(e)}>
                <ListItemIcon>
                  <NotificationsOutlined style={{ color: '#FDFFFF' }} />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                {this.props.notificationsCount > 0 && <div className='notification-badge'>{this.props.notificationsCount}</div>}
              </ListItem>
              <ListItem button onClick={e => this.handleClick(e)}>
                <ListItemIcon>
                  <PersonOutlined style={{ color: '#FDFFFF' }} />
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
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedInReducer.loggedIn,
    notificationsCount: state.badgesReducer.notifications,
    messagesCount: state.badgesReducer.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBadges: (notifications, messages) => dispatch({ type: 'GET_BADGES', notifications: notifications, messages: messages })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));