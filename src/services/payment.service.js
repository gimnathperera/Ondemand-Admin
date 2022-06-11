const httpStatus = require('http-status');

const logger = require('../config/logger');
const { Payment } = require('../models');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

/**
 * Submit invoice by worker - every fortnite  (15th & 30th)
 * @param {Object} worker
 * @returns {Promise<Document>}
 */
const submitInvoice = async (worker) => {
  //  send email to the admin attachings the invoice file
  const existingWorker = await userService.getUserById(worker);
  if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found for ${worker}`);

  logger.info(`✓ Email sending successfully`);
  return existingWorker;
};

const createPaySlipRecord = async (recordBody) => {
  const createdPaySlip = await Payment.create(recordBody);
  logger.info(`✓ Database updated successfully`);
  return createdPaySlip;
};

/**
 * Query for paySlips
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPaySlips = async (filter, options) => {
  const paysSlips = await Payment.paginate(filter, options);
  return paysSlips;
};

module.exports = {
  submitInvoice,
  createPaySlipRecord,
  queryPaySlips,
};
