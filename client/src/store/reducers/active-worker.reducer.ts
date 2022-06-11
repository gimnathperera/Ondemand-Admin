import { SET_ACTIVE_WORKER_LIST } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const activeWorkerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_WORKER_LIST:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default activeWorkerReducer;
