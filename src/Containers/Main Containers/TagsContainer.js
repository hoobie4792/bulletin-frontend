import React from 'react';
import { connect } from 'react-redux';
import TagSearchForm from '../../Components/Tags/TagSearchForm';
import PostList from '../Posts/PostsList';

class TagsContainer extends React.Component {
  componentDidMount() {
    this.props.getPosts([]);
  }

  render() {
    return (
      <React.Fragment>
        <TagSearchForm />
        <PostList posts={this.props.posts} />
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
    getPosts: posts => dispatch({ type: 'GET_POSTS', posts: posts })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);