import {
  SET_COMPANY_SITE_LIST,
  SET_CURRENT_COMPANY_SITE
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentCompanySite: {}
};

const CompanySiteReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_COMPANY_SITE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SET_CURRENT_COMPANY_SITE:
      return {
        ...state,
        currentCompanySite: action.payload
      };

    default:
      return state;
  }
};

export default CompanySiteReducer;
