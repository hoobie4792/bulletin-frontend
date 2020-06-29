import React from 'react';
import NewsPost from '../Components/NewsPost';
import UserPost from '../Components/UserPost';

const mapPosts = (posts) => {
  return posts.map((post, i) => {
    if (post.is_news_story) {
      return <NewsPost post={post} key={i} />
    } else {
      return <UserPost post={post} key={i} />
    }
  }
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