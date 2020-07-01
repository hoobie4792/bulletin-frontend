import React from 'react';
import { connect } from 'react-redux';
import SearchUsersForm from '../../Components/SearchUser/SearchUsersForm';
import SearchUsersList from '../../Components/SearchUser/SearchUsersList';

const FindUserContainer = (props) => {
  return (
    <React.Fragment>
      <SearchUsersForm />
      <SearchUsersList searchedUsers={props.searchedUsers} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    searchedUsers: state.searchedUsersReducer.searchedUsers
  }
}

export default connect(mapStateToProps)(FindUserContainer);