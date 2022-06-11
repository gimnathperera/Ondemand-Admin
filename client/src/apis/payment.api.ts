import { request } from '../common/request';

export const fetchAllPaySlipsApi = async (filters?: any) => {
  try {
    let query = `/payments`;
    if (filters) {
      const { sorted, worker, startDate, endDate } = filters;
      if (sorted) {
        query = query + `?sortBy=createdAt:${sorted}`;
      }
      if (startDate && endDate) {
        query = query + `&startDate=${startDate}&endDate=${endDate}`;
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
