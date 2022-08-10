const httpStatus = require('http-status');
const path = require('path');

const logger = require('../config/logger');
const { Payment } = require('../models');
const { userService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const { removeTempFile } = require('../utils/functions');

/**
 * Submit invoice by worker - every fortnite  (15th & 30th)
 * @param {Object} worker
 * @returns {Promise<Document>}
 */
const submitInvoice = async (worker, attachment) => {
  //  send email to the admin attachings the invoice file
  const existingWorker = await userService.getUserById(worker);
  if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found for ${worker}`);

  const ADMIN1_EMAIL = config.email.admin1Email;
  const ADMIN2_EMAIL = config.email.admin2Email;
  await emailService.sendEmail(ADMIN1_EMAIL, 'Invoice', 'Please refer following invoice', attachment, ADMIN2_EMAIL);

  // remove temp invoice file from the server
  const tempFilePath = path.join(__dirname, `../../uploads/${attachment}`);
  await removeTempFile(tempFilePath);
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
