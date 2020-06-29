import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = (props) => {
    handleClose();
    localStorage.removeItem('auth_token');
    props.setLoggedIn(false);
    props.history.push('/home');
    props.history.go();
  }

  const handleLogin = (props) => {
    handleClose();
    props.history.push('/login');
  }

  const handleSignup = () => {
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenuItems = (props) => {
    if (localStorage.getItem('auth_token')) {
      return (
        <MenuItem onClick={() => handleLogout(props)}>Logout</MenuItem>
      )
    }
    else {
      return (
        [
          <MenuItem key='Log In' onClick={() => handleLogin(props)}>Log In</MenuItem>,
          <MenuItem key='Sign Up' onClick={() => handleSignup(props)}>Sign Up</MenuItem>
        ]
      )
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Bulletin
          </Typography>
        <IconButton
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {renderMenuItems(props)}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: (value) => dispatch({ type: 'SET_LOGGED_IN', loggedIn: value })
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));