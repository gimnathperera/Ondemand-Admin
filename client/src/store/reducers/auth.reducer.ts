import { SET_CURRENT_USER } from '../../constants/common-constant';

const INITIAL_STATE = {
  isAuthenticated: false,
  tokens: null,
  user: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        tokens: action.payload.tokens,
        user: action.payload.user
      };

    default:
      return state;
  }
};

export default authReducer;
