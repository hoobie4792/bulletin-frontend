import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const SingupInterest = (props) => {
  return (
    <FormControlLabel
      control={<Checkbox name={props.interest.id.toString()} color="primary" onChange={(e) => props.handleInterestChange(e)} checked={props.checked} />}
      label={props.interest.name}
    />
  );
}

export default SingupInterest;