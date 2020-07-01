import { createStore, combineReducers } from 'redux';
import loggedInReducer from './Reducers/loggedInReducer';
import messagesReducer from './Reducers/messagesReducer';
import notificationsReducer from './Reducers/notificationsReducer';
import postsReducer from './Reducers/postsReducer';
import signupReducer from './Reducers/signupReducer';
import userReducer from './Reducers/userReducer';

const rootReducer = combineReducers({
  loggedInReducer: loggedInReducer,
  messagesReducer: messagesReducer,
  notificationsReducer: notificationsReducer,
  postsReducer: postsReducer,
  signupReducer: signupReducer,
  userReducer: userReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);