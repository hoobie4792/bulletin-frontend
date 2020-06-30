import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const SignupSource = (props) => {
  return (
    <FormControlLabel
      control={<Checkbox name={props.source.id.toString()} color="primary" onChange={(e) => props.handleSourceChange(e)} />}
      label={props.source.name}
    />
  );
}

export default SignupSource;