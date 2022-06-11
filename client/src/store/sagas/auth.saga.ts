import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  USER_LOGIN,
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_CURRENT_USER
} from '../../constants/common-constant';
import { userLoginApi } from '../../apis/user.api';

export function* userLogin({
  payload
}: {
  type: typeof USER_LOGIN;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(userLoginApi, payload);

    if (response?.status == 200) {
      yield put({ type: SET_CURRENT_USER, payload: response.data });
    } else {
      const message = 'Invalid Credentials.';
      yield put({ type: SET_ERROR_MESSAGE, payload: message });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Invalid Credentials.';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

function* userSaga() {
  yield takeEvery(USER_LOGIN, userLogin);
}

export default userSaga;
