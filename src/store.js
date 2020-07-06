import { createStore, combineReducers } from 'redux';
import loggedInReducer from './Reducers/loggedInReducer';
import conversationsReducer from './Reducers/conversationsReducer';
import interestsReducer from './Reducers/interestsReducer';
import menuReducer from './Reducers/menuReducer';
import newsSourcesReducer from './Reducers/newsSourcesReducer';
import notificationsReducer from './Reducers/notificationsReducer';
import postsReducer from './Reducers/postsReducer';
import searchedUsersReducer from './Reducers/searchedUsersReducer';
import signupReducer from './Reducers/signupReducer';
import userReducer from './Reducers/userReducer';

const rootReducer = combineReducers({
  loggedInReducer: loggedInReducer,
  conversationsReducer: conversationsReducer,
  interestsReducer: interestsReducer,
  menuReducer: menuReducer,
  newsSourcesReducer: newsSourcesReducer,
  notificationsReducer: notificationsReducer,
  postsReducer: postsReducer,
  searchedUsersReducer: searchedUsersReducer,
  signupReducer: signupReducer,
  userReducer: userReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);