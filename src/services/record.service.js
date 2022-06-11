const { Record } = require('../models');
const mongoose = require('mongoose');

/**
 * Create a record
 * @param {Object} recordBody
 * @returns {Promise<Record>}
 */
const createRecord = async (recordBody) => {
  return Record.create(recordBody);
};

/**
 * Get record by jobId
 * @param {ObjectId} id
 * @returns {Promise<Record>}
 */
const getRecordsByJobId = async (jobId) => {
  return await Record.find({ job: mongoose.Types.ObjectId(jobId) });
};

module.exports = {
  createRecord,
  getRecordsByJobId,
};
