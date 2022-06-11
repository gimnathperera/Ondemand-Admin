import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

import {
  BASE_URL,
  HTTP_UNAUTHORIZED
} from '../constants/common-configurations';
import { store } from '../store/';
import { clearLocalStorage } from './functions';
axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error?.response?.status === HTTP_UNAUTHORIZED) {
      console.log('HTTP_UNAUTHORIZED');
      clearLocalStorage();
      window.location.href = '/login';
    } else {
      console.log(error.response?.data);
    }
    return Promise.reject(error);
  }
);

const setAutToken = () => {
  let token: any = store.getState()?.auth?.tokens?.access?.token
    ? `Bearer ${store.getState()?.auth?.tokens?.access?.token}`
    : null;

  axios.defaults.headers.common['Authorization'] = token;
};

export const request = async (
  method: any,
  endPoint: string,
  data?: object,
  isImageData: boolean = false
) => {
  try {
    let headerDict = {
      accept: 'application/json',
      'Content-Type': isImageData ? 'multipart/form-data' : 'application/json'
    };
    setAutToken();
    const res = await axios({
      method: method,
      url: endPoint,
      ...(data && { data }),
      headers: headerDict
    });

    return res;
  } catch (error) {
    throw error;
  }
};
