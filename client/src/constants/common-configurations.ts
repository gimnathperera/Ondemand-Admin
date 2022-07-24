export const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://ondemand-dev.herokuapp.com/v1';
// export const BASE_URL = 'http://localhost:5000/v1';
export const HTTP_UNAUTHORIZED = 401;
export const MOBILE_REGEX =
  /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

// Worker email service
export const AGREEMENT_DOC_NAME = 'Agreement_Doc.pdf';
export const AGREEMENT_MESSAGE = 'AGREEMENT_MESSAGE';
export const AGREEMENT_SUBJECT = 'AGREEMENT_SUBJECT';

//User types
export const USER_TYPE = {
  CUSTOMER: 'Customer',
  ADMIN: 'Admin',
  WORKER: 'Worker'
};

//Document types
export const DOC_TYPE = {
  LICENSE: 'License',
  PROOF_OF_ID: 'Proof_of_id',
  PROOF_OF_ADDRESS: 'Proof_of_address',
  POLICE_CLEARENCE: 'Police_clearence',
  CURRENT_VISA: 'Police_clearence',
  VACCINE: 'Vaccine'
};

//JobSchedule types
export const JOB_SCHEDULE_TYPE = {
  EMERGENCY: 'Emergency',
  SCHEDULED: 'Scheduled',
  SHIFTTED: 'Shiftted'
};
