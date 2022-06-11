const jobStatus = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const jobStatuses = ['Pending', 'Active', 'Completed'];
const jobTypes = ['Registered Nurse', 'Enrolled Nurse', 'Disability Support Worker', 'Cleaner', 'Other'];

const jobScheduleType = {
  EMERGENCY: 'Emergency',
  SCHEDULED: 'Scheduled',
  SHIFTTED: 'Shiftted',
};

const jobScheduleTypes = ['Emergency', 'Scheduled', 'Shiftted'];

const jobLocationTypes = {
  POINT: 'Point',
};

const jobType = {
  REGISTERED_NURSE: 'Registered Nurse',
  ENROLLED_NURSE: 'Enrolled Nurse',
  DISABILITY_SUPPORT_WORKER: 'Disability Support Worker',
  CLEANER: 'Cleaner',
  OTHER: 'Other',
};

module.exports = {
  jobStatus,
  jobLocationTypes,
  jobStatuses,
  jobTypes,
  jobType,
  jobScheduleType,
  jobScheduleTypes,
};
