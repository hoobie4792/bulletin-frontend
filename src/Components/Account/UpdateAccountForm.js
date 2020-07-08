import React from 'react';
import { withRouter } from 'react-router'

class UpdateAccountForm extends React.Component {
  state = {
    username: '',
    bio: ''
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
          this.getUserInfo(usernameResponse.username);
        }
      })
  }

  getUserInfo = (username) => {
    const token = localStorage.getItem('auth_token');

    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      }
    }

    fetch(`http://localhost:3000/api/v1/users/${username}`, fetchObj)
      .then(res => res.json())
      .then(user => {
        if (!user.message) {
          this.setState({ ...this.state, username: user.username, bio: user.bio });
        }
      })
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Must be logged in to update user account information');
      return
    }

    const userObj = {
      user: {
        username: e.target.username.value,
        bio: e.target.bio.value
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      },
      body: JSON.stringify(userObj)
    }

    fetch('http://localhost:3000/api/v1/update-user', fetchObj)
      .then(res => res.json())
      .then(updateResponse => {
        if (updateResponse.message) {
          alert(updateResponse.message)
        } else {
          this.props.history.push('/home');
          this.props.history.go();
        }
      })
  }

  render() {
    return (
      <form className='account-form' onSubmit={this.handleSubmit}>
        <label>Username:</label>
        <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
        <label>Bio:</label>
        <input type='text' name='bio' value={this.state.bio} onChange={this.handleChange} />
        <input type='submit' value="Update Account Info" />
      </form>
    )
  }
}

export default withRouter(UpdateAccountForm);