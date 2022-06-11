import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  FETCH_MESSAGES,
  FETCH_CHAT_BY_USER,
  SET_CHAT_BY_USER,
  SET_MESSAGES,
  SET_SUCCESS_MESSAGE
} from '../../constants/common-constant';
import {
  fetchChatByUserApi,
  fetchMessagesApi,
  sendMessageApi,
  updateMessageApi
} from '../../apis/msg.api';

export function* sendMessage({
  payload
}: {
  type: typeof SEND_MESSAGE;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newMessage = yield call(sendMessageApi, payload);

    if (newMessage.data) {
      const message = 'Message sent successfully';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
      yield put({ type: FETCH_CHAT_BY_USER, payload: payload?.to });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Message sending failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateMessage({
  payload
}: {
  type: typeof UPDATE_MESSAGE;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });
    yield call(updateMessageApi, payload);

    yield put({ type: FETCH_MESSAGES });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Message update failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* fetchMessages({
  payload
}: {
  type: typeof FETCH_MESSAGES;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchMessagesApi, payload);

    yield put({ type: SET_MESSAGES, payload: response.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchChatByUser({
  payload
}: {
  type: typeof FETCH_CHAT_BY_USER;
  payload: any;
}): any {
  try {
    yield put({ type: SET_CHAT_BY_USER, payload: [] });

    yield put({ type: START_LOADING });

    const response = yield call(fetchChatByUserApi, payload);

    yield put({ type: SET_CHAT_BY_USER, payload: response.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

function* msgSaga() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
  yield takeEvery(UPDATE_MESSAGE, updateMessage);
  yield takeEvery(FETCH_MESSAGES, fetchMessages);
  yield takeEvery(FETCH_CHAT_BY_USER, fetchChatByUser);
}

export default msgSaga;
