import React from 'react';
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import Menu from './Menu';
import MainContainer from '../Containers/MainContainer';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      this.props.setLoggedIn(true);
    } else {
      this.props.setLoggedIn(false);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Grid container>
          <Grid item xs={3}>
            <Menu />
          </Grid>
          <Grid item xs={6}>
            <MainContainer />
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: (value) => dispatch({ type: 'SET_LOGGED_IN', loggedIn: value })
  }
}

export default connect(null, mapDispatchToProps)(App);
