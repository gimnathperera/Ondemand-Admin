const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getReports = {
  query: Joi.object().keys({
    status: Joi.string(),
    worker: Joi.string(),
    sortBy: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChartData = {
  params: Joi.object().keys({
    workerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getReports,
  getChartData,
};
