import {
  SET_DASHBOARD_DATA,
  SET_DETAILED_CHART_DATA
} from '../../constants/common-constant';

const INITIAL_STATE = {
  customers: null,
  newApplicants: null,
  workers: null,
  detailedChartData: null
};

const dashboardReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        customers: action?.payload?.customers,
        newApplicants: action?.payload?.newApplicants,
        workers: action?.payload?.workers,
        jobs: action?.payload?.jobs
      };
    case SET_DETAILED_CHART_DATA:
      return {
        ...state,
        detailedChartData: action?.payload
      };

    default:
      return state;
  }
};

export default dashboardReducer;
