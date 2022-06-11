import { SET_ALL_PAY_SLIPS } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const paymentReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_PAY_SLIPS:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default paymentReducer;
