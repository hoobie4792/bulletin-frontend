import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import TagsContainer from './TagsContainer';
import ConversationsContainer from './ConversationsContainer';
import NotificationsContainer from './NotificationsContainer';
import UserPageRedirect from '../../Components/User Page/UserPageRedirect';
import UserPageContainer from './UserPageContainer';
import LoginForm from '../../Components/Account/LoginForm';
import SignupFormsContainer from '../Account/SignupFormsContainer';

const MainContainer = (props) => {
  return (
    <div className='main-container'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/home' component={HomeContainer} />
        <Route exact path='/tags' component={TagsContainer} />
        <Route exact path='/messages' component={ConversationsContainer} />
        <Route exact path='/notifications' component={NotificationsContainer} />
        <Route exact path='/profile' component={UserPageRedirect} />
        <Route exact path='/profile/:username' component={UserPageContainer} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/signup' component={SignupFormsContainer} />
      </Switch>
    </div>
  );
};

export default MainContainer;
