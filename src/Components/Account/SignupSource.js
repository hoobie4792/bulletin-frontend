import React from 'react';
import { Grid } from '@material-ui/core';

const SignupSource = (props) => {
  return (
    <Grid item>
      <div onClick={() => props.handleSourceChange(props.source.id)}>
        <img
          style={props.checked ? { boxShadow: 'inset 0px 0px 0px 5px #3d6081' } : { border: 'none' }}
          className='signup-source-interest-image'
          src={`/News Source Logos/${props.source.name}.jpg`}
          alt='source'
        />
        <div className='signup-source-interest-label'>{props.source.name}</div>
      </div>
    </Grid>
  );
}

export default SignupSource;