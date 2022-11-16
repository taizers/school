import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { pages as pagesAction } from '../actions/index';
import {
  GET_PAGE,
  GET_PAGES,
  GET_PAGES_LIST,
  CREATE_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,
} from '../constants/types';
import { createToast } from '../utils/toasts';
import { pages as pagesApi } from '../api/index';

function* getPage({ payload }) {
  yield put(pagesAction.setPagesLoading(true));
  try {
    const {
      data: { data },
    } = yield call(pagesApi.getPage, payload);

    yield put(pagesAction.getPageSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(pagesAction.setPagesLoading(false));
  }
}

function* getPages() {
  yield put(pagesAction.setPagesLoading(true));
  try {
    const {
      data: { data },
    } = yield call(pagesApi.getPages);

    yield put(pagesAction.getPagesSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(pagesAction.setPagesLoading(false));
  }
}

function* getPagesList() {
  yield put(pagesAction.setPagesLoading(true));
  try {
    const {
      data: { data },
    } = yield call(pagesApi.getPagesList);

    yield put(pagesAction.getPagesListSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(pagesAction.setPagesLoading(false));
  }
}

function* createPage({ payload }) {
  yield put(pagesAction.setPagesLoading(true));
  try {
    const {
      data: { data },
    } = yield call(pagesApi.createPage, payload);

    yield put(pagesAction.createPageSuccessed(data));
    yield put(pagesAction.getPages());
    yield put(pagesAction.setCreatePageModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(pagesAction.setPagesLoading(false));
  }
}

function* updatePage({ payload }) {
  yield put(pagesAction.setPagesLoading(true));
  try {
    const {
      data: { data },
    } = yield call(pagesApi.updatePage, payload);

    yield put(pagesAction.updatePageSuccessed(data));
    yield put(pagesAction.getPage(payload?.id));
    yield put(pagesAction.getPages());
    yield put(pagesAction.setUpdatePageModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(pagesAction.setPagesLoading(false));
    yield put(pagesAction.clearPage());
  }
}

function* deletePage({ payload }) {
  yield put(pagesAction.setPagesLoading(true));
  try {
    const {
      data: { data },
    } = yield call(pagesApi.deletePage, payload?.id);

    yield put(pagesAction.deletePageSuccessed(data));
    yield put(pagesAction.getPages());
    yield payload?.history('/');
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(pagesAction.setPagesLoading(false));
  }
}

function* watchGetPage() {
  yield takeEvery(GET_PAGE, getPage);
}

function* watchCreatePage() {
  yield takeEvery(CREATE_PAGE, createPage);
}

function* watchUpdatePage() {
  yield takeEvery(UPDATE_PAGE, updatePage);
}

function* watchDeletePage() {
  yield takeEvery(DELETE_PAGE, deletePage);
}

function* watchGetPages() {
  yield takeEvery(GET_PAGES, getPages);
}

function* watchGetPagesList() {
  yield takeEvery(GET_PAGES_LIST, getPagesList);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetPage),
    fork(watchCreatePage),
    fork(watchUpdatePage),
    fork(watchDeletePage),
    fork(watchGetPages),
    fork(watchGetPagesList),
  ]);
}
