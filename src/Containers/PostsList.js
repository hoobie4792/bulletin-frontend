import React from 'react';
import Post from '../Components/Post';

const mapPosts = (posts) => {
  return posts.map((post, i) =>
    <Post post={post} key={i} />
  );
}

const PostsList = (props) => {
  return (
    <React.Fragment>
      <h1>Posts</h1>
      {mapPosts(props.posts)}
    </React.Fragment>
  );
}

export default PostsList