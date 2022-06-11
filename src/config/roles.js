const allRoles = {
  Worker: ['manageUserJobs', 'manageMessages', 'manageDocuments', 'managePayments'],
  Admin: [
    'getUsers',
    'manageUsers',
    'getCustomers',
    'manageCustomers',
    'manageJobs',
    'getJobs',
    'manageMessages',
    'manageDocuments',
    'manageAdminOnlyMessages',
    'manageReports',
    'manageUserJobs',
    'managePayments',
  ],
};

const workerTypes = ['Driver', 'Car Cleaner', 'Other'];
const workerStatus = ['Active', 'Pending', 'Reviewing', 'Deactivated'];

const priorities = ['High', 'Medium', 'Low'];
const customerStatus = ['Active', 'Deactivated'];
const genders = ['M', 'F'];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  workerTypes,
  workerStatus,
  priorities,
  customerStatus,
  genders,
};
