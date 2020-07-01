import React from 'react';
import SearchUsersForm from '../../Components/SearchUser/SearchUsersForm';
import SearchUsersList from '../../Components/SearchUser/SearchUsersList';

const FindUserContainer = () => {
  return (
    <React.Fragment>
      <SearchUsersForm />
      <SearchUsersList />
    </React.Fragment>
  )
}

export default FindUserContainer;