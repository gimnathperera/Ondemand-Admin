import { SET_ALL_REPORTS } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const reportReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_REPORTS:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default reportReducer;
