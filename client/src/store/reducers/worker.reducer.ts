import {
  SET_WORKER_LIST,
  SET_CURRENT_WORKER
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentWorker: {}
};

const workerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_WORKER_LIST:
      return {
        ...state,
        list: action.payload.results
      };
    case SET_CURRENT_WORKER:
      return {
        ...state,
        currentWorker: action.payload
      };

    default:
      return state;
  }
};

export default workerReducer;
