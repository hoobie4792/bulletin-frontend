import React from 'react';
import UpdateAccountForm from '../../Components/Account/UpdateAccountForm';
import SignupInterestsSourcesForm from '../../Components/Account/SignupInterestsSourcesForm';

const UpdateProfileContainer = (props) => {
  return (
    <React.Fragment>
      <UpdateAccountForm />
      <SignupInterestsSourcesForm />
    </React.Fragment>
  )
}

export default UpdateProfileContainer;