import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { galeries as galeriesAction } from '../actions/index';
import { GET_ALL_GALERIES_PAGINATED, GET_GALERY, CREATE_GALERY, UPDATE_GALERY, DELETE_GALERY } from '../constants/types';
import { createToast } from '../utils/toasts';
import { galeries as galeriesApi } from '../api/index';

function* getGalery({ payload }) {
  yield put(galeriesAction.setGaleriesLoading(true));
  try {
    const { data: {data} } = yield call(galeriesApi.getGalery, payload);

    yield put(galeriesAction.getGalerySuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(galeriesAction.setGaleriesLoading(false));
  }
}

function* getGaleriesPaginated({ payload }) {
    yield put(galeriesAction.setGaleriesLoading(true));
    try {
        const {data: {data}} = yield call(galeriesApi.getAllGaleriesPaginated, payload);

        yield put(galeriesAction.getAllGaleriesPaginatedSuccessed(data));
    } catch (error) {
      yield createToast.error(error?.response?.data?.data?.message);
    } finally {
        yield put(galeriesAction.setGaleriesLoading(false));
    }
}

function* createGalery({ payload }) {
  yield put(galeriesAction.setGaleriesLoading(true));
  try {
    const { data: {data} } = yield call(galeriesApi.createGalery, payload);

    yield put(galeriesAction.createGalerySuccessed(data));
    yield put(galeriesAction.getAllGaleriesPaginated(1, 10));
    yield put(galeriesAction.setGaleriesModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(galeriesAction.setGaleriesLoading(false));
  }
}

function* updateGalery({ payload }) {
  yield put(galeriesAction.setGaleriesLoading(true));
  try {
    const { data: {data} } = yield call(galeriesApi.updateGalery, payload);

    yield put(galeriesAction.updateGalerySuccessed(data));
    yield put(galeriesAction.getAllGaleriesPaginated(1, 10));
    yield put(galeriesAction.setGaleriesModalStatus(false));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(galeriesAction.setGaleriesLoading(false));
  }
}

function* deleteGalery({ payload }) {
  yield put(galeriesAction.setGaleriesLoading(true));
  try {
    const { data: {data} } = yield call(galeriesApi.deleteGalery, payload);

    yield put(galeriesAction.deleteGalerySuccessed(data));
  } catch (error) {
    yield createToast.error(error?.response?.data?.data?.message);
  } finally {
    yield put(galeriesAction.setGaleriesLoading(false));
  }
}

function* watchGetGalery() {
  yield takeEvery(GET_GALERY, getGalery);
}

function* watchGetGaleriesPaginated() {
    yield takeEvery(GET_ALL_GALERIES_PAGINATED, getGaleriesPaginated);
}

function* watchCreateGalery() {
    yield takeEvery(CREATE_GALERY, createGalery);
}

function* watchUpdateGalery() {
    yield takeEvery(UPDATE_GALERY, updateGalery);
}

function* watchDeleteGalery() {
    yield takeEvery(DELETE_GALERY, deleteGalery);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetGalery),
    fork(watchGetGaleriesPaginated),
    fork(watchCreateGalery),
    fork(watchUpdateGalery),
    fork(watchDeleteGalery),
  ]);
}
