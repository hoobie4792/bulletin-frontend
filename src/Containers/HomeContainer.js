import React from 'react';
import { connect } from 'react-redux';
import NewPostForm from '../Components/NewPostForm';
import PostsList from './PostsList';

class HomeContainer extends React.Component {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    const token = localStorage.getItem('auth_token');

    let fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (token) {
      fetchObj = { ...fetchObj, headers: { ...fetchObj.headers, 'Auth-Token': token } };
    }

    fetch('http://localhost:3000/api/v1/posts', fetchObj)
      .then(res => res.json())
      .then(posts => this.props.getPosts(posts))
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isLoggedIn && <NewPostForm />}
        <PostsList posts={this.props.posts} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loggedInReducer.loggedIn,
    posts: state.postsReducer.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (posts) => dispatch({ type: 'GET_POSTS', posts: posts })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);