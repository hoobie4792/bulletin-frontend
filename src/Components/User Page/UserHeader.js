import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class UserHeader extends React.Component {
  state = {
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
        } else {
          alert(usernameResponse.message);
        }
      });
  }

  handleFollow = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return;
    }

    const followObj = {
      follow: { username: this.props.match.params.username }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      },
      body: JSON.stringify(followObj)
    }

    fetch('http://localhost:3000/api/v1/follows', fetchObj)
      .then(res => res.json())
      .then(followResponse => {
        if (followResponse.message) {
          alert(followResponse.message);
        } else {
          this.props.updateFollow(followResponse);
          this.props.history.go();
        }
      })
      .catch((response) => alert('Something went wrong'))
  }

  render() {
    return (
      <React.Fragment>
        <h2>Username: {this.props.user.username}</h2>
        <h4>Bio: {this.props.user.bio}</h4>
        <h5>Member since: {this.props.user.created_at}</h5>
        <h5>Posts: {this.props.user.posts_count}</h5>
        {this.state.username !== this.props.match.params.username && this.props.loggedIn &&
          <Button variant='contained' color='primary' onClick={() => this.handleFollow()}>
            {this.props.following ? 'Unfollow' : 'Follow'}
          </Button>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedInReducer.loggedIn,
    following: state.userReducer.user.following
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFollow: (following) => dispatch({ type: 'UPDATE_FOLLOW', following: following })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHeader));