import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserHeader from '../../Components/User Page/UserHeader';
import PostsList from '../Posts/PostsList';

class UserPageContainer extends React.Component {
  componentDidMount() {
    this.getUserInfo();
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  getUserInfo = () => {
    const token = localStorage.getItem('auth_token');

    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': token
      }
    }

    fetch(`http://localhost:3000/api/v1/users/${this.props.match.params.username}`, fetchObj)
      .then(res => res.json())
      .then(user => {
        if (!user.message) {
          this.props.getUser(user);
        } else {
          console.log(user.message);
        }
      })
  }

  renderUser = () => {
    const userPopulated = Object.keys(this.props.user).length > 0
    return <React.Fragment>
      {userPopulated && (
        <React.Fragment>
          <UserHeader user={this.props.user} />
          <PostsList posts={this.props.user.posts} updatePosts={this.props.updatePosts} />
        </React.Fragment>
      )}
    </React.Fragment>
  }

  handleScroll = () => {
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    const button = document.querySelector('.back-to-top-button')
    if (scrollPosition > 500) {
      button.style.display = 'block'
    } else {
      button.style.display = 'none';
    }
  }

  scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <React.Fragment>
        <button
          className='back-to-top-button'
          onClick={this.scrollToTop}
        >Back to Top</button>
        {this.renderUser()}
      </React.Fragment>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: user => dispatch({ type: 'GET_USER', user: user }),
    updatePosts: (post) => dispatch({ type: 'UPDATE_USER_POSTS', post: post })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPageContainer));