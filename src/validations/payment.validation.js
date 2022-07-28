const Joi = require('joi');
const { objectId } = require('./custom.validation');

const submitInvoice = {
  body: Joi.object().keys({
    worker: Joi.required().custom(objectId),
    startDate: Joi.string(),
    endDate: Joi.string(),
  }),
};

const getPaySlips = {
  query: Joi.object().keys({
    isSend: Joi.boolean(),
    worker: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFortnitePayment = {
  params: Joi.object().keys({
    workerId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    startDate: Joi.string(),
    endDate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  submitInvoice,
  getPaySlips,
  getFortnitePayment,
};
