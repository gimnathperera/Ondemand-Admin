import { request } from '../common/request';

export const fetchWorkerListApi = async () => {
  try {
    const response = await request(
      'GET',
      `/users?role=Worker&limit=100&sortBy=createdAt:desc`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchActiveWorkerListApi = async () => {
  try {
    const response = await request(
      'GET',
      `/users?role=Worker&limit=100&status=Active&sortBy=createdAt:desc`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPendingWorkerListApi = async () => {
  try {
    const response = await request(
      'GET',
      `/users?role=Worker&status=Reviewing&sortBy=createdAt:desc`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePendingWorkerApi = async (id: string) => {
  try {
    const response = await request('DELETE', `/users/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchAvailableWorkerListApi = async (id: string) => {
  try {
    const response = await request('POST', `/get-available-workers`, {
      job_id: id
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkerByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/users/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkerApi = async (worker: any) => {
  try {
    const response = await request('PUT', `/worker/${worker?.id}`, {
      name: worker?.name,
      email: worker?.email,
      password: worker?.password,
      status: worker?.status == 1 ? 0 : 1,
      assign_alias: worker?.assign_alias,
      additional_info: worker?.additional_info,
      dob: worker?.dob,
      address: worker?.address,
      contact_number: worker?.contact_number,
      certificate: worker?.certificate,
      certificate_expire_date: worker?.certificate_expire_date,
      employee_number: worker?.employee_number
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createWokerApi = async (payload: any) => {
  try {
    const response = await request('POST', `/users`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateWokerApi = async ({ id, data }: any) => {
  try {
    const response = await request('PATCH', `/users/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const emailSendApi = async (payload: any) => {
  try {
    const response = await request('POST', `/users/send-email`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};
