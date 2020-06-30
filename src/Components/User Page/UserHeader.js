import React from 'react';

const UserHeader = ({ user }) => {
  return (
    <React.Fragment>
      <h2>Username: {user.username}</h2>
      <h4>Bio: {user.bio}</h4>
      <h5>Member since: {user.created_at}</h5>
      <h5>Posts: {user.posts_count}</h5>
    </React.Fragment>
  );
}

export default UserHeader;