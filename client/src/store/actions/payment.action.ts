import { FETCH_ALL_PAY_SLIPS } from '../../constants/common-constant';

export const fetchAllPaySlips = (payload?: any) => ({
  type: FETCH_ALL_PAY_SLIPS,
  payload
});
