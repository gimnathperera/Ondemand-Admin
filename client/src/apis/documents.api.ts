import axios from 'axios';

import { request } from '../common/request';
import { BASE_URL } from '../constants/common-configurations';

export const uploadDocumentApi = async (formData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDocumentsByOwnerApi = async ({ owner }) => {
  try {
    const response = await request('GET', `/documents?owner=${owner}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePicApi = async (formData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/documents/prof-pic`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
