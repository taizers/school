import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { news as newsAction } from '../actions/index';
import {
  GET_ALL_NEWS_PAGINATED,
  GET_NEWS,
  CREATE_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  GET_NEWS_WIDGET,
} from '../constants/types';
import { createToast } from '../utils/toasts';
import { news as newsApi } from '../api/index';

function* getNews({ payload }) {
  yield put(newsAction.setNewsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(newsApi.getNews, payload);

    yield put(newsAction.getNewsSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(newsAction.setNewsLoading(false));
  }
}

function* getNewsPaginated({ payload }) {
  yield put(newsAction.setNewsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(newsApi.getAllNewsPaginated, payload);

    yield put(newsAction.getAllNewsPaginatedSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(newsAction.setNewsLoading(false));
  }
}

function* getNewsWidget({ payload }) {
  yield put(newsAction.setNewsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(newsApi.getAllNewsPaginated, payload);

    yield put(newsAction.getNewsWidgetSuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(newsAction.setNewsLoading(false));
  }
}

function* createNews({ payload }) {
  yield put(newsAction.setNewsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(newsApi.createNews, payload);

    yield put(newsAction.createNewsSuccessed(data));
    yield put(newsAction.getAllNewsPaginated(1, 10));
    yield put(newsAction.setNewsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(newsAction.setNewsLoading(false));
  }
}

function* updateNews({ payload }) {
  yield put(newsAction.setNewsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(newsApi.updateNews, payload);

    yield put(newsAction.updateNewsSuccessed(data));
    yield put(newsAction.getAllNewsPaginated(1, 10));
    yield put(newsAction.setNewsModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(newsAction.setNewsLoading(false));
    yield put(newsAction.clearNews());
  }
}

function* deleteNews({ payload }) {
  yield put(newsAction.setNewsLoading(true));
  try {
    const {
      data: { data },
    } = yield call(newsApi.deleteNews, payload);

    yield put(newsAction.deleteNewsSuccessed(data));
    yield put(newsAction.getAllNewsPaginated(1, 10));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(newsAction.setNewsLoading(false));
  }
}

function* watchGetNews() {
  yield takeEvery(GET_NEWS, getNews);
}

function* watchGetNewsWidget() {
  yield takeEvery(GET_NEWS_WIDGET, getNewsWidget);
}

function* watchGetNewsPaginated() {
  yield takeEvery(GET_ALL_NEWS_PAGINATED, getNewsPaginated);
}

function* watchCreateNews() {
  yield takeEvery(CREATE_NEWS, createNews);
}

function* watchUpdateNews() {
  yield takeEvery(UPDATE_NEWS, updateNews);
}

function* watchDeleteNews() {
  yield takeEvery(DELETE_NEWS, deleteNews);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetNews),
    fork(watchGetNewsPaginated),
    fork(watchCreateNews),
    fork(watchUpdateNews),
    fork(watchDeleteNews),
    fork(watchGetNewsWidget),
  ]);
}
