import { put, takeEvery, call } from 'redux-saga/effects';

import _ from 'lodash';

import {
  SET_LOADING,
  UNSET_LOADING,
  SET_ERROR_MESSAGE,
  START_LOADING,
  END_LOADING,
  SET_DASHBOARD_DATA,
  FETCH_DASHBOARD_DATA,
  FETCH_DETAILED_CHART_DATA,
  SET_DETAILED_CHART_DATA
} from '../../constants/common-constant';
import {
  fetchDashboardDataApi,
  fetchDetailedChartDataApi
} from 'src/apis/job.api';

export function* startLoading() {
  try {
    yield put({ type: START_LOADING });
  } catch (error) {}
}

export function* stopLoading() {
  try {
    yield put({ type: END_LOADING });
  } catch (error) {}
}

export function* fetchDashboardData(): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchDashboardDataApi);

    if (response?.data) {
      yield put({
        type: SET_DASHBOARD_DATA,
        payload: {
          customers: response?.data?.customers,
          newApplicants: response?.data?.newApplicants,
          workers: response?.data?.workers,
          jobs: response?.data?.jobs
        }
      });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchDetailedChartData({
  payload
}: {
  type: typeof FETCH_DETAILED_CHART_DATA;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });
    const response: any = yield call(fetchDetailedChartDataApi, payload);

    if (response?.data) {
      yield put({
        type: SET_DETAILED_CHART_DATA,
        payload: response?.data?.summary
      });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

function* commonSaga() {
  yield takeEvery(SET_LOADING, startLoading);
  yield takeEvery(UNSET_LOADING, stopLoading);
  yield takeEvery(FETCH_DASHBOARD_DATA, fetchDashboardData);
  yield takeEvery(FETCH_DETAILED_CHART_DATA, fetchDetailedChartData);
}

export default commonSaga;
