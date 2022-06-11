import {
  SET_JOB_LIST,
  SET_CURRENT_JOB,
  SET_JOB_TIME_LINE
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentJob: {},
  records: []
};

const jobReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_JOB_LIST:
      return {
        ...state,
        list: action.payload.results
      };
    case SET_CURRENT_JOB:
      return {
        ...state,
        currentJob: action.payload
      };
    case SET_JOB_TIME_LINE:
      return {
        ...state,
        records: action.payload
      };
    default:
      return state;
  }
};

export default jobReducer;
