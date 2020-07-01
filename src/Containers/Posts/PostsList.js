import React from 'react';
import NewsPost from '../../Components/Posts/NewsPost';
import UserPost from '../../Components/Posts/UserPost';

const mapPosts = (props) => {
  return props.posts.map((post, i) => {
    if (post.is_news_story) {
      return <NewsPost post={post} key={i} updatePosts={props.updatePosts} />
    } else {
      return <UserPost post={post} key={i} updatePosts={props.updatePosts} />
    }
  }
  );
}

const PostsList = (props) => {
  return (
    <React.Fragment>
      {props.posts && mapPosts(props)}
    </React.Fragment>
  );
}

export default PostsList