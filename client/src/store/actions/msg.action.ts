import {
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  FETCH_MESSAGES,
  FETCH_CHAT_BY_USER
} from '../../constants/common-constant';

export const sendMessage = (payload: any) => ({
  type: SEND_MESSAGE,
  payload: payload
});

export const updateMessage = (payload: any) => ({
  type: UPDATE_MESSAGE,
  payload: payload
});

export const fetchMessages = (payload?: any) => ({
  type: FETCH_MESSAGES,
  ...(payload && { payload })
});

export const fetchChatByUser = (payload: any) => ({
  type: FETCH_CHAT_BY_USER,
  payload
});
