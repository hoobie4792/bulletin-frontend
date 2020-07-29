import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../../services/apiRoot';

const handleSearch = (e, props) => {
  e.preventDefault();

  const userObj = {
    user: {
      username: e.target.username.value
    }
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  }

  fetch(`${API_ROOT}/search-users`, fetchObj)
    .then(res => res.json())
    .then(searchedUsers => {
      props.getSearchedUsers(searchedUsers)
    })
    .catch(() => 'Something went wrong');
}

const FindUserForm = (props) => {
  return (
    <React.Fragment>
      <div className='search-form-container'>
        <form className='bulletin-form' onSubmit={(e) => handleSearch(e, props)}>
          <input type='text' name='username' placeholder='Search users...' />
          <input type='submit' value='Search users...' />
        </form>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    searchedUsers: state.searchedUsersReducer.searchedUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchedUsers: searchedUsers => dispatch({ type: 'GET_SEARCHED_USERS', searchedUsers: searchedUsers })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindUserForm);