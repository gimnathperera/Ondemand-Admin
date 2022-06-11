import {
  SET_PENDING_WORKER_LIST,
  SET_CURRENT_WORKER
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentApplicant: {}
};

const NewApplicantsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_PENDING_WORKER_LIST:
      return {
        ...state,
        list: action.payload.results
      };

    case SET_CURRENT_WORKER:
      return {
        ...state,
        currentApplicant: action.payload
      };

    default:
      return state;
  }
};

export default NewApplicantsReducer;
