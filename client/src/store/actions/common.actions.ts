import {
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  CLEAR_REDUX_STORE,
  SET_LOADING,
  UNSET_LOADING,
  SUCCESS_OPEN,
  SUCCESS_CLOSE,
  ERROR_OPEN,
  ERROR_CLOSE,
  FETCH_DASHBOARD_DATA,
  FETCH_DETAILED_CHART_DATA
} from './../../constants/common-constant';

export function successOpen() {
  return {
    type: SUCCESS_OPEN
  };
}

export const setSuccessMessage = (payload) => {
  return {
    type: SET_SUCCESS_MESSAGE,
    payload
  };
};

export function successClose() {
  return {
    type: SUCCESS_CLOSE
  };
}

export function errorOpen() {
  return {
    type: ERROR_OPEN
  };
}

export const setErrorMessage = (payload) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload
  };
};

export function errorClose() {
  return {
    type: ERROR_CLOSE
  };
}

export const userLogout = () => {
  return {
    type: CLEAR_REDUX_STORE
  };
};

export const fetchDashboardData = () => ({
  type: FETCH_DASHBOARD_DATA
});

export const fetchDetailedChartData = (payload: any) => ({
  type: FETCH_DETAILED_CHART_DATA,
  payload
});

export function startLoading() {
  return {
    type: SET_LOADING
  };
}

export function endLoading() {
  return {
    type: UNSET_LOADING
  };
}
