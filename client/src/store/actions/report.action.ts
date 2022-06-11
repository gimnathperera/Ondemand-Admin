import { FETCH_ALL_REPORTS } from '../../constants/common-constant';

export const fetchAllReports = (payload?: any) => ({
  type: FETCH_ALL_REPORTS,
  payload
});
