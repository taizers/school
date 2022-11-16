import { all } from 'redux-saga/effects';

import authSaga from './auth';
import usersSaga from './users';
import booksSaga from './books';
import newsSaga from './news';
import galeriesSaga from './galeries';
import groupsSaga from './groups';
import storagesSaga from './storages';
import pagesSaga from './pages';

export default function* rootSaga() {
  yield all([
    authSaga(),
    usersSaga(),
    booksSaga(),
    newsSaga(),
    galeriesSaga(),
    groupsSaga(),
    storagesSaga(),
    pagesSaga(),
  ]);
}
