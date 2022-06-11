import { SET_DOCUMENTS_BY_OWNER } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const DocumentReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_DOCUMENTS_BY_OWNER:
      return {
        ...state,
        list: action.payload
      };

    default:
      return state;
  }
};

export default DocumentReducer;
