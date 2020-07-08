import React from 'react';
import { connect } from 'react-redux';
import TagSearchForm from '../../Components/Tags/TagSearchForm';
import PostsList from '../Posts/PostsList';

class TagsContainer extends React.Component {
  componentDidMount() {
    this.props.getPosts([]);
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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