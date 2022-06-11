const geolib = require('geolib');
const moment = require('moment');
const fs = require('fs');

const { location } = require('../config/config');
const logger = require('../config/logger');

/**
 * Check object availability
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Boolean}
 */
const findWorkerObject = (arr, workerId) => {
  const element = arr.find((value) => {
    return value.worker.id == workerId;
  });
  return typeof element === 'undefined' ? false : true;
};

const isLocationVerified = async (assignedLocation, actualLocation) => {
  const result = geolib.isPointWithinRadius(assignedLocation, actualLocation, location.distanceVariable);
  return result;
};

const calcWorkingHours = (startTime, endTime) => {
  const _startTime = moment(startTime, 'HH:mm');
  const _endTime = moment(endTime, 'HH:mm');
  const duration = moment.duration(_endTime.diff(_startTime));

  // round up minutes to nearst hour
  const hours = Math.round(parseInt(duration.asMinutes()) / 60);

  return hours;
};

const generatePaySlipName = (worker) => {
  const _month = moment().format('MMMM');
  const _day = moment().format('DD');

  return `${_month}-${_day}-E${worker}.pdf`;
};

const generateInvoiceId = (worker) => {
  const _date = moment().format('YYYY/MM/DD');
  return `${_date}/E${worker}`;
};

const removeTempFile = async (filePath) => {
  await fs.promises.rm(filePath, {
    recursive: true,
    force: true,
  });
  logger.info('✓ Temp file removed successfully');
};

module.exports = {
  findWorkerObject,
  isLocationVerified,
  calcWorkingHours,
  generatePaySlipName,
  removeTempFile,
  generateInvoiceId,
};
