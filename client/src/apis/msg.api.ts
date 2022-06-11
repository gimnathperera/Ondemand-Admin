import { request } from '../common/request';

export const sendMessageApi = async (payload: any) => {
  try {
    const response = await request('POST', `/messages`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchMessagesApi = async (payload?: any) => {
  try {
    const END_POINT = payload
      ? `/messages?status=${payload.status}`
      : `/messages`;
    const response = await request('GET', END_POINT);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchChatByUserApi = async (payload?: any) => {
  try {
    const response = await request('GET', `messages/chat/${payload}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMessageApi = async ({ id }: any) => {
  try {
    const data = {
      status: 'Read'
    };
    const response = await request('PATCH', `messages/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
