const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    to: Joi.string().custom(objectId),
    from: Joi.string().custom(objectId),
    description: Joi.string().required(),
    isFromAdmin: Joi.boolean().required(),
  }),
};

const getMessagesByTo = {
  params: Joi.object().keys({
    to: Joi.string().custom(objectId),
  }),
};
const getMessages = {
  query: Joi.object().keys({
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChatByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getMessagesByFrom = {
  params: Joi.object().keys({
    from: Joi.string().custom(objectId),
  }),
};

const updateMessage = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().valid('Read', 'Unread'),
    })
    .min(1),
};

module.exports = {
  createMessage,
  getMessagesByTo,
  getMessagesByFrom,
  updateMessage,
  getMessages,
  getChatByUser,
};
