import React from 'react';
import { connect } from 'react-redux';
import NewPostForm from '../../Components/Posts/NewPostForm';
import PostsList from '../Posts/PostsList';
import { API_ROOT } from '../../services/apiRoot';

class HomeContainer extends React.Component {
  componentDidMount() {
    this.fetchPosts();
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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

    fetch(`${API_ROOT}/posts`, fetchObj)
      .then(res => res.json())
      .then(posts => {
        this.props.getPosts(posts);
      })
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
        {this.props.isLoggedIn && <NewPostForm />}
        <PostsList posts={this.props.posts} updatePosts={this.props.updatePosts} />
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
    getPosts: (posts) => dispatch({ type: 'GET_POSTS', posts: posts }),
    updatePosts: (post) => dispatch({ type: 'UPDATE_POSTS', post: post })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);