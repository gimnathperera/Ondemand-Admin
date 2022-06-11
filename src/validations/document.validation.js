const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadFile = {
  body: Joi.object().keys({
    owner: Joi.required().custom(objectId),
  }),
};

const getFile = {
  params: Joi.object().keys({
    fileKey: Joi.string().required(),
  }),
};

const getFilesByOwner = {
  query: Joi.object().keys({
    owner: Joi.required().custom(objectId),
  }),
};

module.exports = {
  getFile,
  uploadFile,
  getFilesByOwner,
};
