import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PostsList from '../Posts/PostsList';

class InterestsContainer extends React.Component {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch(`http://localhost:3000/api/v1/interests/${this.props.match.params.interest}`)
      .then(res => res.json())
      .then(interestResponse => {
        this.props.getPosts(interestResponse)
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
    posts: state.interestsReducer.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: posts => dispatch({ type: 'GET_INTERESTS_POSTS', posts: posts })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterestsContainer));