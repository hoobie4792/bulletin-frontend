import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PostsList from '../Posts/PostsList';

class NewsSourcesContainer extends React.Component {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch(`http://localhost:3000/api/v1/news_sources/${this.props.match.params.newsSource}`)
      .then(res => res.json())
      .then(newsSourceResponse => {
        this.props.getPosts(newsSourceResponse)
      })
  }

  render() {
    return (
      <PostsList posts={this.props.posts} />
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
    getPosts: posts => dispatch({ type: 'GET_NEWS_SOURCES_POSTS', posts: posts })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsSourcesContainer));