import {
  SET_JOB_WOKER_LIST,
  SET_AVAILABLE_WORKER_LIST
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentJobWorker: {},
  availableList: []
};

const jobWorkerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_JOB_WOKER_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SET_AVAILABLE_WORKER_LIST:
      return {
        ...state,
        availableList: action.payload
      };

    default:
      return state;
  }
};

export default jobWorkerReducer;
