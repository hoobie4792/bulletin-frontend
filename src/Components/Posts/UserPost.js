import React from 'react';
import RegularUserPost from './RegularUserPost';
import SharedUserPost from './SharedUserPost';

const renderPost = (props) => {
  return props.post.shared_post ?
    <SharedUserPost
      post={props.post}
      updatePosts={props.updatePosts}
    />
    :
    <RegularUserPost
      post={props.post}
      updatePosts={props.updatePosts}
    />
}

const UserPost = (props) => {
  return (
    <React.Fragment>
      {renderPost(props)}
    </React.Fragment>
  )
}

export default UserPost;