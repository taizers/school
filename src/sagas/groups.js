import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { groups as groupsAction } from '../actions/index';
import {
  GET_ADMINISTRATION_GROUP,
  GET_GROUPS_LIST,
  GET_GROUP,
  GET_ALL_GROUPS,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
} from '../constants/types';
import { createToast } from '../utils/toasts';
import { groups as groupsApi } from '../api/index';

function* getGroup({ payload }) {
  yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.getGroup, payload);

    yield put(groupsAction.getGroupSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(groupsAction.setGroupsLoading(false));
  }
}

function* getGroups() {
  yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.getAllGroups);

    yield put(groupsAction.getAllGroupsSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(groupsAction.setGroupsLoading(false));
  }
}

function* getGroupsList() {
  // yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.getGroupsList);

    yield put(groupsAction.getGroupsListSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    // yield put(groupsAction.setGroupsLoading(false));
  }
}

function* getAdministrationGroup() {
  yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.getAdministartionGroup);

    yield put(groupsAction.getAdministrationGroupSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(groupsAction.setGroupsLoading(false));
  }
}

function* createGroup({ payload }) {
  yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.createGroup, payload);

    yield put(groupsAction.createGroupSuccessed(data));
    yield put(groupsAction.getAllGroups());
    yield put(groupsAction.setGroupsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(groupsAction.setGroupsLoading(false));
  }
}

function* updateGroup({ payload }) {
  yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.updateGroup, payload);

    yield put(groupsAction.updateGroupSuccessed(data));
    yield put(groupsAction.getAllGroups());
    yield put(groupsAction.setGroupsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(groupsAction.setGroupsLoading(false));
    yield put(groupsAction.clearGroup());
  }
}

function* deleteGroup({ payload }) {
  yield put(groupsAction.setGroupsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(groupsApi.deleteGroup, payload);

    yield put(groupsAction.deleteGroupSuccessed(data));
    yield put(groupsAction.getAllGroups());
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(groupsAction.setGroupsLoading(false));
  }
}

function* watchGetGroup() {
  yield takeEvery(GET_GROUP, getGroup);
}

function* watchGetGroups() {
  yield takeEvery(GET_ALL_GROUPS, getGroups);
}

function* watchCreateGroup() {
  yield takeEvery(CREATE_GROUP, createGroup);
}

function* watchUpdateGroup() {
  yield takeEvery(UPDATE_GROUP, updateGroup);
}

function* watchDeleteGroup() {
  yield takeEvery(DELETE_GROUP, deleteGroup);
}
function* watchGetGroupsList() {
  yield takeEvery(GET_GROUPS_LIST, getGroupsList);
}
function* watchGetAdministrationGroup() {
  yield takeEvery(GET_ADMINISTRATION_GROUP, getAdministrationGroup);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetGroup),
    fork(watchGetGroups),
    fork(watchCreateGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
    fork(watchGetGroupsList),
    fork(watchGetAdministrationGroup),
  ]);
}
