import React from 'react';
import { Grid } from '@material-ui/core';

const SingupInterest = (props) => {
  return (
    // <FormControlLabel
    //   control={<Checkbox name={props.interest.id.toString()} color="primary" onChange={(e) => props.handleInterestChange(e)} checked={props.checked} />}
    //   label={props.interest.name}
    // />
    <Grid item>
      <div onClick={() => props.handleInterestChange(props.interest.id)}>
        <img
          style={props.checked ? { boxShadow: 'inset 0px 0px 0px 5px #3d6081' } : { border: 'none' }}
          className='signup-source-interest-image'
          src={`/Interest Icons/${props.interest.name}.jpg`}
          alt='interest'
        />
        <div className='signup-source-interest-label'>{props.interest.name}</div>
      </div>
    </Grid>
  );
}

export default SingupInterest;