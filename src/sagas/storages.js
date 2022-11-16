import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { storages as storagesAction } from '../actions/index';
import {
  GET_STORAGE_GROUPS_LIST,
  GET_STORAGE_GROUP,
  GET_ALL_STORAGE_GROUPS,
  CREATE_STORAGE_GROUP,
  UPDATE_STORAGE_GROUP,
  DELETE_STORAGE_GROUP,
  CREATE_STORAGE_FILE,
  DELETE_STORAGE_FILE,
} from '../constants/types';
import { createToast } from '../utils/toasts';
import { storages as storagesApi } from '../api/index';

function* getStorageGroup({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.getStorageGroup, payload);

    yield put(storagesAction.getStorageGroupSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* getStorageGroups({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.getAllStorageGroups, payload);
    yield put(storagesAction.getAllStorageGroupsSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* getStorageGroupsList() {
  // yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.getStorageGroupsList);

    yield put(storagesAction.getStorageGroupsListSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    // yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* createStorageGroup({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.createStorageGroup, payload);

    yield put(storagesAction.createStorageGroupSuccessed(data));
    yield put(storagesAction.getAllStorageGroups(1, 10));
    yield put(storagesAction.setStorageGroupsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* updateStorageGroup({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.updateStorageGroup, payload);

    yield put(storagesAction.updateStorageGroupSuccessed(data));
    yield put(storagesAction.getAllStorageGroups(1, 10));
    yield put(storagesAction.setStorageGroupsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
    yield put(storagesAction.clearStorageGroup());
  }
}

function* deleteStorageGroup({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.deleteStorageGroup, payload);

    yield put(storagesAction.deleteStorageGroupSuccessed(data));
    yield put(storagesAction.getAllStorageGroups(1, 10));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* createStorageFile({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.createStorageFile, payload.data);

    yield put(storagesAction.createStorageFileSuccessed(data));
    yield put(storagesAction.getStorageGroup(payload.groupId, 1, 10));
    yield put(storagesAction.setStorageGroupsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* deleteStorageFile({ payload }) {
  yield put(storagesAction.setStorageGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(storagesApi.deleteStorageFile, payload.deleteId);

    yield put(storagesAction.deleteStorageFileSuccessed(data));
    yield put(storagesAction.getStorageGroup(payload.groupId, 1, 10));
    yield put(storagesAction.setStorageGroupsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(storagesAction.setStorageGroupsLoading(false));
  }
}

function* watchGetStorageGroup() {
  yield takeEvery(GET_STORAGE_GROUP, getStorageGroup);
}

function* watchGetStorageGroups() {
  yield takeEvery(GET_ALL_STORAGE_GROUPS, getStorageGroups);
}

function* watchCreateStorageGroup() {
  yield takeEvery(CREATE_STORAGE_GROUP, createStorageGroup);
}

function* watchUpdateStorageGroup() {
  yield takeEvery(UPDATE_STORAGE_GROUP, updateStorageGroup);
}

function* watchDeleteStorageGroup() {
  yield takeEvery(DELETE_STORAGE_GROUP, deleteStorageGroup);
}

function* watchGetStorageGroupsList() {
  yield takeEvery(GET_STORAGE_GROUPS_LIST, getStorageGroupsList);
}

function* watchCreateStorageFile() {
  yield takeEvery(CREATE_STORAGE_FILE, createStorageFile);
}

function* watchDeleteStorageFile() {
  yield takeEvery(DELETE_STORAGE_FILE, deleteStorageFile);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetStorageGroup),
    fork(watchGetStorageGroups),
    fork(watchCreateStorageGroup),
    fork(watchUpdateStorageGroup),
    fork(watchDeleteStorageGroup),
    fork(watchGetStorageGroupsList),
    fork(watchCreateStorageFile),
    fork(watchDeleteStorageFile),
  ]);
}
