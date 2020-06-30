import React from 'react';
import NewsPost from '../../Components/Posts/NewsPost';
import UserPost from '../../Components/Posts/UserPost';

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
      {props.posts && mapPosts(props.posts)}
    </React.Fragment>
  );
}

export default PostsList