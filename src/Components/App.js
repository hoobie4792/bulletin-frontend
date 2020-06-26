import React from 'react';
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './Header'
import Menu from './Menu';
import HomeContainer from '../Containers/HomeContainer';
import TagsContainer from '../Containers/TagsContainer';
import MessagesContainer from '../Containers/MessagesContainer';
import NotificationsContainer from '../Containers/NotificationsContainer';
import UserPageContainer from '../Containers/UserPageContainer';
import LoginForm from './LoginForm'
// import MainContainer from '../Containers/MainContainer';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Grid container>
        <Grid item xs={3}>
          <Menu />
        </Grid>
        <Grid item xs={6}>
          <Switch>
            <Route exact path='/home'>
              <HomeContainer />
            </Route>
            <Route exact path='/tags'>
              <TagsContainer />
            </Route>
            <Route exact path='/messages'>
              <MessagesContainer />
            </Route>
            <Route exact path='/notifications'>
              <NotificationsContainer />
            </Route>
            <Route exact path='/user'>
              <UserPageContainer />
            </Route>
            <Route exact path='/login'>
              <LoginForm />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default connect()(App);
