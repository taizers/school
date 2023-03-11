import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { LOGOUT } from '../constants/types';
import auth from './auth';
import users from './users';
import news from './news';
import galeries from './galeries';
import groups from './groups';
import storages from './storages';
import pages from './pages';
import { clearToken } from '../utils';

const appReducer = combineReducers({
  auth,
  users,
  news,
  galeries,
  groups,
  storages,
  pages,
  // eslint-disable-next-line no-restricted-globals
  router: connectRouter(history),
});

const rootReducer = (state: any, action: { type: string; action: any }) => {
  if (action.type === LOGOUT) {
    state.auth = {
      authUser: {},
      isLoading: false,
      isAuth: false,
      role: '',
    };
    clearToken();
  }
  return appReducer(state, action);
};

export { rootReducer };
