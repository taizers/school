import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { LOGOUT } from '../constants/types';
import auth from './auth';
import users from './users';
import books from './books';
import { clearToken } from '../utils';

const appReducer = combineReducers({
  auth,
  users,
  books,
  // eslint-disable-next-line no-restricted-globals
  router: connectRouter(history),
});

const rootReducer = (state: any, action: { type: string; action: any }) => {
  if (action.type === LOGOUT) {
    state = undefined;
    clearToken();
  }
  return appReducer(state, action);
};

export { rootReducer };
