import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PostsList from '../Posts/PostsList';
import { API_ROOT } from '../../services/apiRoot';

class NewsSourcesContainer extends React.Component {
  componentDidMount() {
    this.fetchPosts();
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  fetchPosts = () => {
    fetch(`${API_ROOT}/news_sources/${this.props.match.params.newsSource}`)
      .then(res => res.json())
      .then(newsSourceResponse => {
        this.props.getPosts(newsSourceResponse)
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
        <PostsList posts={this.props.posts} updatePosts={this.props.updatePosts} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.newsSourcesReducer.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: posts => dispatch({ type: 'GET_NEWS_SOURCES_POSTS', posts: posts }),
    updatePosts: (post) => dispatch({ type: 'UPDATE_NEWS_SOURCES_POSTS', post: post })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsSourcesContainer));