import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { users as usersApi } from '../api/index';
import { users as usersAction, auth as authAction } from '../actions/index';
import { setToken } from '../utils/index';
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  GET_CEO,
  GET_USER,
  UPDATE_PROFILE,
  UPDATE_USER,
} from '../constants/types';
import { createToast } from '../utils/toasts';

function* createUser({ payload }) {
  yield put(usersAction.setUsersLoading(true));
  try {
    const {
      data: { data },
    } = yield call(usersApi.createUser, payload);
    yield put(usersAction.createUserSuccessed(data));
    yield put(usersAction.getAllUsers(1, 10));
    yield put(usersAction.setUserModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
  }
}

function* getAllUsers({ payload }) {
  yield put(usersAction.setUsersLoading(true));
  try {
    const {
      data: { data },
    } = yield call(usersApi.getAllUsers, payload);
    yield put(usersAction.getAllUsersSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
  }
}

function* getUser({ payload }) {
  yield put(usersAction.setUsersLoading(true));
  try {
    const {
      data: { data },
    } = yield call(usersApi.getUser, payload);
    yield put(usersAction.getUserSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
  }
}

function* getCEO() {
  yield put(usersAction.setUsersLoading(true));
  try {
    const {
      data: { data },
    } = yield call(usersApi.getCEO);
    yield put(usersAction.getCEOSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
  }
}

function* updateUser({ payload }) {
  yield put(usersAction.setUsersLoading(true));
  try {
    const {
      data: { data },
    } = yield call(usersApi.updateUser, payload);
    yield put(usersAction.getAllUsers(1, 10));
    yield put(usersAction.setUserModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
    yield put(usersAction.clearUser());
  }
}

function* updateProfile({ payload }) {
  yield put(usersAction.setUsersLoading(true));
  try {
    const {
      data: { data },
    } = yield call(usersApi.updateProfile, payload);
    yield put(usersAction.updateProfileSuccessed(data));
    yield put(usersAction.setProfileModal(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
  }
}

function* deleteUser({ payload }) {
  yield put(usersAction.setUsersLoading(true));
  try {
    const responce = yield call(usersApi.deleteUser, payload);
    yield put(usersAction.deleteUserSuccessed(responce.status));
    yield put(usersAction.getAllUsers(1, 10));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(usersAction.setUsersLoading(false));
  }
}

function* watchCreateUser() {
  yield takeEvery(CREATE_USER, createUser);
}

function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USERS, getAllUsers);
}

function* watchGetUser() {
  yield takeEvery(GET_USER, getUser);
}

function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUser);
}

function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, deleteUser);
}

function* watchUpdateProfile() {
  yield takeEvery(UPDATE_PROFILE, updateProfile);
}

function* watchGetCEO() {
  yield takeEvery(GET_CEO, getCEO);
}

export default function* rootSaga() {
  yield all([
    fork(watchCreateUser),
    fork(watchGetAllUsers),
    fork(watchGetUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
    fork(watchUpdateProfile),
    fork(watchGetCEO),
  ]);
}
