const moment = require('moment');
const mongoose = require('mongoose');
const _ = require('lodash');

const { userStatus } = require('../config/users');
const { Log, Job, User } = require('../models');
const { isLocationVerified, calcWorkingHours } = require('../utils/functions');

/**
 * Query for reports
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReports = async (filter, options) => {
  const reports = await Log.paginate(filter, options);
  const _reports = reports.results;
  const updatedReports = [];

  if (_reports.length > 0) {
    for await (const report of _reports) {
      const result = await isLocationVerified(
        { latitude: report.job.location.coordinates[0], longitude: report.job.location.coordinates[1] },
        { latitude: report.location.coordinates[0], longitude: report.location.coordinates[1] }
      );
      const hours = calcWorkingHours(report?.startTime, report?.endTime);

      updatedReports.push({ ...report.toObject(), ...{ locationStatus: result, workingHours: hours } });
    }
  }

  reports.results = updatedReports;
  return reports;
};

/**
 * Query for reports
 * @returns {Promise<QueryResult>}
 */
const getDashboardData = async () => {
  const workers = await User.countDocuments({ status: userStatus.ACTIVE, role: 'Worker' });
  const newApplicants = await User.countDocuments({ status: userStatus.REVIEWING, role: 'Worker' });
  const jobs = await Job.countDocuments();

  return { workers, newApplicants, jobs };
};

/**
 * Query for reports
 * @returns {Promise<QueryResult>}
 */
const getChartData = async (workerId) => {
  //get first and last date of each month
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ');
  const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DDTHH:mm:ssZ');

  const jobs = await Log.find({
    worker: mongoose.Types.ObjectId(workerId),
    createdAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });

  const times = [];

  if (jobs.length > 0) {
    for await (const { startTime, endTime, logginDate } of jobs) {
      // round up minutes to nearst hour
      const hours = calcWorkingHours(startTime, endTime);
      times.push({ logginDate: moment(logginDate).format('YYYY-MM-DD'), hours });
    }
  }

  _summary = _.chain(times)
    .reduce(function (acc, i) {
      acc[i.logginDate] = (acc[i.logginDate] || 0) + i.hours;
      return acc;
    }, {})
    .toPairs()
    .map(function (x) {
      var tmp = {};
      tmp[x[0]] = x[1];
      return tmp;
    })
    .value();

  let lables = _.map(_summary, (obj) => Object.keys(obj)[0]);
  let dataset = _.map(_summary, (obj) => Object.values(obj)[0]);

  return { summary: { lables, dataset } };
};

module.exports = {
  queryReports,
  getDashboardData,
  getChartData,
};
