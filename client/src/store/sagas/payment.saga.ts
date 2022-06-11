import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_ALL_PAY_SLIPS,
  SET_ALL_PAY_SLIPS
} from '../../constants/common-constant';
import { fetchAllPaySlipsApi } from '../../apis/payment.api';

export function* fetchAllPaySlips({
  payload
}: {
  type: typeof FETCH_ALL_PAY_SLIPS;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchAllPaySlipsApi, payload);
    if (response?.data) {
      yield put({
        type: SET_ALL_PAY_SLIPS,
        payload: response?.data
      });
    } else {
      yield put({
        type: SET_ALL_PAY_SLIPS,
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
  yield takeEvery(FETCH_ALL_PAY_SLIPS, fetchAllPaySlips);
}

export default reportSaga;
