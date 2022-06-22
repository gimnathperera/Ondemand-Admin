import axios from 'axios';
import { request } from '../common/request';
import { BASE_URL } from '../constants/common-configurations';

export const fetchJobListApi = async () => {
  try {
    const response = await request(
      'GET',
      `/jobs?limit=100&sortBy=createdAt:desc`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJobByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/jobs/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createJobApi = async (payload: any) => {
  try {
    const response = await request('POST', `/jobs`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateJobApi = async ({ id, data }: any) => {
  try {
    const response = await request('PATCH', `/jobs/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJobWorkerListApi = async ({ id, requiredDate }) => {
  try {
    const response = await request(
      'GET',
      `/jobs/job-workers/${id}?requiredDate=${requiredDate}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const createJobWorkersApi = async ({ jobID, workers }: any) => {
  try {
    const response = await request('PATCH', `/jobs/${jobID}`, { workers });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDashboardDataApi = async () => {
  try {
    const response = await request('GET', `/report/dashboard`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDetailedChartDataApi = async (workerId: any) => {
  try {
    const response = await request('GET', `/report/detailed-chart/${workerId}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchLatestJobsByWorkerApi = async ({ workerId, jobDate }) => {
  try {
    const response = await request(
      'GET',
      `/worker-job?worker_id=${workerId}&date=${jobDate}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJobTimeLineApi = async ({ jobId }) => {
  try {
    const response = await request('GET', `/jobs/records/${jobId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
