import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const SignupSource = (props) => {
  return (
    <React.Fragment>
      <FormControlLabel
        control={<Checkbox name={props.source.id.toString()} color="primary" onChange={(e) => props.handleSourceChange(e)} checked={props.checked} />}
        label={props.source.name}
      />
    </React.Fragment>
  );
}

export default SignupSource;