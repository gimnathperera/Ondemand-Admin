import {
  UPLOAD_DOCUMENT,
  FETCH_DOCUMENTS_BY_OWNER,
  UPLOAD_PROFILE_PIC
} from '../../constants/common-constant';

export const uploadDocument = (payload: any) => ({
  type: UPLOAD_DOCUMENT,
  payload: payload
});

export const fetchDocumentsByOwner = (payload: any) => ({
  type: FETCH_DOCUMENTS_BY_OWNER,
  payload: payload
});

export const uploadProfilePic = (payload: any) => ({
  type: UPLOAD_PROFILE_PIC,
  payload: payload
});
