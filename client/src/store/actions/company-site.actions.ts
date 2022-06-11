import {
  FETCH_COMPANY_SITE_LIST,
  ADD_COMPANY_SITE,
  FETCH_COMPANY_SITE_BY_ID,
  UPDATE_COMPANY_SITE,
  DELETE_COMPANY_SITE
} from '../../constants/common-constant';

export const fetchCompanySiteList = (payload: any) => ({
  type: FETCH_COMPANY_SITE_LIST,
  payload: payload
});

export const createCompanySite = (payload: any) => ({
  type: ADD_COMPANY_SITE,
  payload: payload
});

export const deleteCompanySite = (payload: any) => ({
  type: DELETE_COMPANY_SITE,
  payload: payload
});

export const updateCompanySite = (payload: any) => ({
  type: UPDATE_COMPANY_SITE,
  payload: payload
});

export const fetchCompanySiteById = (payload: any) => ({
  type: FETCH_COMPANY_SITE_BY_ID,
  payload: payload
});
