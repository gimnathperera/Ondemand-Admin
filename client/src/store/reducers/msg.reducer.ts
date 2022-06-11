import {
  SET_MESSAGES,
  SET_CHAT_BY_USER
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentChat: []
};

const MessageReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        list: action.payload
      };
    case SET_CHAT_BY_USER:
      return {
        ...state,
        currentChat: action.payload
      };

    default:
      return state;
  }
};

export default MessageReducer;
