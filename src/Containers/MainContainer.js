import React from 'react';
import { connect } from 'react-redux';

const MainContainer = (props) => {
  return (
    <div className='main-container'>
      <h1>I am the main container</h1>
      <h2>Window: {props.window}</h2>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    window: state.windowReducer.window
  }
}

export default connect(mapStateToProps)(MainContainer);