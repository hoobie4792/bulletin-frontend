import React from 'react';
import { connect } from 'react-redux';
import SearchUsersForm from '../../Components/SearchUser/SearchUsersForm';
import SearchUsersList from '../../Components/SearchUser/SearchUsersList';

const FindUserContainer = (props) => {
  return (
    <div className='search-users-container'>
      <SearchUsersForm />
      <SearchUsersList searchedUsers={props.searchedUsers} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchedUsers: state.searchedUsersReducer.searchedUsers
  }
}

export default connect(mapStateToProps)(FindUserContainer);