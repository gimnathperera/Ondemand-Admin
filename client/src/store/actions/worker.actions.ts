import {
  FETCH_WORKER_LIST,
  FETCH_PENDING_WORKER_LIST,
  FETCH_AVAILABLE_WORKER_LIST,
  FETCH_WORKER_BY_ID,
  ADD_WORKER,
  DELETE_WORKER,
  UPDATE_WORKER,
  DELETE_PENDING_WORKER,
  FETCH_ACTIVE_WORKER_LIST,
  EMAIL_SEND
} from '../../constants/common-constant';

export const fetchWorkerList = () => ({
  type: FETCH_WORKER_LIST
});

export const fetchPendingWorkerList = () => ({
  type: FETCH_PENDING_WORKER_LIST
});

export const deletePendingWorker = (payload: any) => ({
  type: DELETE_PENDING_WORKER,
  payload: payload
});

export const fetchAvailableWorkerList = (payload: any) => ({
  type: FETCH_AVAILABLE_WORKER_LIST,
  payload: payload
});

export const fetchActiveWorkerList = () => ({
  type: FETCH_ACTIVE_WORKER_LIST
});

export const createWorker = (payload: any) => ({
  type: ADD_WORKER,
  payload: payload
});

export const deleteWorker = (payload: any) => ({
  type: DELETE_WORKER,
  payload: payload
});

export const updateWorker = (payload: any) => ({
  type: UPDATE_WORKER,
  payload: payload
});

export const sendEmail = (payload: any) => ({
  type: EMAIL_SEND,
  payload: payload
});

export const fetchWorkerById = (payload: any) => ({
  type: FETCH_WORKER_BY_ID,
  payload: payload
});
