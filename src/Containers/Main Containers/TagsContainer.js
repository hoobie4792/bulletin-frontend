import React from 'react';
import { connect } from 'react-redux';
import TagSearchForm from '../../Components/Tags/TagSearchForm';
import PostsList from '../Posts/PostsList';

class TagsContainer extends React.Component {
  componentDidMount() {
    this.props.getPosts([]);
  }

  render() {
    return (
      <React.Fragment>
        <TagSearchForm />
        <PostsList posts={this.props.posts} updatePosts={this.props.updatePosts} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: posts => dispatch({ type: 'GET_POSTS', posts: posts }),
    updatePosts: (post) => dispatch({ type: 'UPDATE_POSTS', post: post })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);