import React, { useState } from 'react';
import SignupAccountForm from '../../Components/Account/SignupAccountForm';
import SignupInterestsSourcesForm from '../../Components/Account/SignupInterestsSourcesForm'

const SignupFormsContainer = () => {
  const [pickInterestsSources, setPickInterestsSources] = useState(false)

  return (
    <React.Fragment>
      {!pickInterestsSources &&
        <SignupAccountForm
          pickInterestsSources={pickInterestsSources}
          setPickInterestsSources={setPickInterestsSources}
        />
      }
      {pickInterestsSources &&
        <SignupInterestsSourcesForm
          pickInterestsSources={pickInterestsSources}
          setPickInterestsSources={setPickInterestsSources}
        />
      }
    </React.Fragment>
  )
}

export default SignupFormsContainer;