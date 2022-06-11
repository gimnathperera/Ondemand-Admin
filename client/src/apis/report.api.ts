import { request } from '../common/request';

export const fetchAllReportsApi = async (filters?: any) => {
  try {
    let query = `/report`;
    if (filters) {
      const { status, sorted, worker, startDate, endDate } = filters;
      if (sorted) {
        query = query + `?sortBy=createdAt:${sorted}`;
      }
      if (startDate && endDate) {
        query = query + `&startDate=${startDate}&endDate=${endDate}`;
      }
      if (status && status !== 'All') {
        query = query + `&status=${status}`;
      }
      if (worker && worker !== 'All') {
        query = query + `&worker=${worker}`;
      }
    }

    const response = await request('GET', query);

    return response;
  } catch (error) {
    throw error;
  }
};
