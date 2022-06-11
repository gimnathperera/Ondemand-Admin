import { SET_LATEST_JOBS_BY_WORKER } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const DailyJobReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_LATEST_JOBS_BY_WORKER:
      return {
        ...state,
        list: action.payload
      };

    default:
      return state;
  }
};

export default DailyJobReducer;
