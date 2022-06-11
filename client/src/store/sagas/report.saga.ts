import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_ALL_REPORTS,
  SET_ALL_REPORTS
} from '../../constants/common-constant';
import { fetchAllReportsApi } from '../../apis/report.api';

export function* fetchAllReports({
  payload
}: {
  type: typeof FETCH_ALL_REPORTS;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchAllReportsApi, payload);
    if (response?.data) {
      yield put({
        type: SET_ALL_REPORTS,
        payload: response?.data
      });
    } else {
      yield put({
        type: SET_ALL_REPORTS,
        payload: []
      });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}
function* reportSaga() {
  yield takeEvery(FETCH_ALL_REPORTS, fetchAllReports);
}

export default reportSaga;
