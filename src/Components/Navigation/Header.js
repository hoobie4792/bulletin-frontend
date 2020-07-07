import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

class Header extends React.Component {
  state = {
    anchorEl: null,
    username: ''
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      }
    }

    fetch('http://localhost:3000/api/v1/get-username', fetchObj)
      .then(res => res.json())
      .then(usernameResponse => {
        if (usernameResponse.username) {
          this.setState({ ...this.state, username: usernameResponse.username });
        }
      })
  }

  handleLogout = () => {
    this.handleClose();
    localStorage.removeItem('auth_token');
    this.props.setLoggedIn(false);
    this.props.history.push('/home');
    this.props.history.go();
  }

  handleEditProfile = (props) => {
    this.handleClose();
    this.props.history.push('/update-profile');
  }

  handleLogin = (props) => {
    this.handleClose();
    this.props.history.push('/login');
  }

  handleSignup = () => {
    this.handleClose();
    this.props.history.push('/signup');
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  renderMenuItems = () => {
    if (localStorage.getItem('auth_token')) {
      return (
        <div className='logged-in-menu'>
          <MenuItem onClick={() => this.handleLogout(this.props)}>Logout</MenuItem>
          <MenuItem onClick={() => this.handleEditProfile(this.props)}>Update Profile</MenuItem>
        </div>
      )
    }
    else {
      return (
        [
          <MenuItem key='Log In' onClick={() => this.handleLogin(this.props)}>Log In</MenuItem>,
          <MenuItem key='Sign Up' onClick={() => this.handleSignup(this.props)}>Sign Up</MenuItem>
        ]
      )
    }
  }

  render() {
    return (
      <AppBar elevation={0} position="sticky" style={{ background: 'transparent' }}>
        <Toolbar>
          <Typography variant="h3" style={{ marginLeft: '9%', marginTop: '2%', flexGrow: 1 }}>
            Bulletin
          </Typography>
          <IconButton
            style={{ marginRight: '9%' }}
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle style={{ paddingRight: '10px' }} />
            <Typography>{this.state.username}</Typography>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            {this.renderMenuItems(this.props)}
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: (value) => dispatch({ type: 'SET_LOGGED_IN', loggedIn: value })
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));