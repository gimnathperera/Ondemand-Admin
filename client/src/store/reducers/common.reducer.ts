import {
  START_LOADING,
  END_LOADING,
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  SUCCESS_OPEN,
  SUCCESS_CLOSE,
  ERROR_OPEN,
  ERROR_CLOSE
} from '../../constants/common-constant';

const INITIAL_STATE = {
  loading: false,
  success: false,
  successMessage: null,
  error: false,
  errorMessage: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case END_LOADING:
      return {
        ...state,
        loading: false
      };

    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        success: true,
        successMessage: action.payload
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        error: true,
        errorMessage: action.payload
      };
    case SUCCESS_OPEN:
      return {
        ...state,
        success: true
      };

    case SUCCESS_CLOSE:
      return {
        ...state,
        success: false
      };
    case ERROR_OPEN:
      return {
        ...state,
        error: true
      };
    case ERROR_CLOSE:
      return {
        ...state,
        error: false
      };
    default:
      return state;
  }
};
