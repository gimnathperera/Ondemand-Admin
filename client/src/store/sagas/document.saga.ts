import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  UPLOAD_DOCUMENT,
  SET_SUCCESS_MESSAGE,
  FETCH_DOCUMENTS_BY_OWNER,
  SET_DOCUMENTS_BY_OWNER,
  UPLOAD_PROFILE_PIC
} from '../../constants/common-constant';
import {
  uploadDocumentApi,
  fetchDocumentsByOwnerApi,
  uploadProfilePicApi
} from 'src/apis/documents.api';

export function* uploadDocument({
  payload
}: {
  type: typeof UPLOAD_DOCUMENT;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(uploadDocumentApi, payload);

    if (response.data) {
      const payload = {
        owner: response.data[0].owner,
        ownerType: response.data[0].ownerType
      };
      yield put({ type: FETCH_DOCUMENTS_BY_OWNER, payload });
      const message = 'Document submitted successfully';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Document submission failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}
export function* uploadProfilePic({
  payload
}: {
  type: typeof UPLOAD_PROFILE_PIC;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(uploadProfilePicApi, payload);

    if (response.data) {
      const message = 'Profile picture updated successfully';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Profile picture updated failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* fetchDocumentsByOwner({
  payload
}: {
  type: typeof FETCH_DOCUMENTS_BY_OWNER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchDocumentsByOwnerApi, payload);

    yield put({ type: SET_DOCUMENTS_BY_OWNER, payload: response.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

function* documentSaga() {
  yield takeEvery(UPLOAD_DOCUMENT, uploadDocument);
  yield takeEvery(UPLOAD_PROFILE_PIC, uploadProfilePic);
  yield takeEvery(FETCH_DOCUMENTS_BY_OWNER, fetchDocumentsByOwner);
}

export default documentSaga;
