const Joi = require('joi');
const { password, dob, mobile, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required().custom(mobile),
    address: Joi.string().required(),
    dob: Joi.date().required().custom(dob),
    userType: Joi.string().required().valid('Driver', 'Car Cleaner', 'Other'),
    gender: Joi.string().required().valid('M', 'F'),
    nationality: Joi.string().required(),
    emergencyContact: Joi.string().required().custom(mobile),
    abn: Joi.string().required(),
    nameOfBank: Joi.string().required(),
    bsb: Joi.string().required(),
    accountNumber: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const checkEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const checkUserStatus = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  checkEmail,
  checkUserStatus,
};
