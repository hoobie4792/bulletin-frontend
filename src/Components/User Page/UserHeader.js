import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import formatDate from '../../Helpers/formatDate';

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
        }
      })
  }

  handleFollowRequest = () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return;
    }

    const followObj = {
      follow_request: { followed: this.props.match.params.username }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      },
      body: JSON.stringify(followObj)
    }

    fetch('http://localhost:3000/api/v1/follow_requests', fetchObj)
      .then(res => res.json())
      .then(followResponse => {
        if (followResponse.message) {
          alert(followResponse.message);
        } else {
          this.props.updateFollow(followResponse.result);
        }
      })
      .catch((response) => alert('Something went wrong'))
  }

  render() {
    return (
      <div className='user-header'>
        <div className='user-header-username'>{this.props.user.username}</div>
        <div className='user-header-info'>
          <Grid container>
            <Grid item xs={6}>
              <div className='user-header-bio'>Bio: {this.props.user.bio}</div>
              <div className='user-header-member-since'>Member since: {formatDate(this.props.user.created_at).split(' - ')[1]}</div>
            </Grid>
            <Grid item xs={6}>
              <div className='user-header-count'>Posts: {this.props.user.posts_count}</div>
              <div className='user-header-count'>Following: {this.props.user.followers_count}</div>
              <div className='user-header-count'>Followers: {this.props.user.following_count}</div>
            </Grid>
          </Grid>
        </div>
        {
          this.state.username !== this.props.match.params.username && this.props.loggedIn &&
          <button className='follow-button' onClick={() => this.handleFollowRequest()}>
            {this.props.following}
          </button>
        }
      </div >
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