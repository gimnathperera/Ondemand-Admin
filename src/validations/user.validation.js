const Joi = require('joi');
const { password, objectId, dob, mobile } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required().custom(mobile),
    address: Joi.string().required(),
    role: Joi.string().required().valid('Worker', 'Admin'),
    dob: Joi.date().required().custom(dob),
    userType: Joi.string().required().valid('Driver', 'Car Cleaner', 'Other'),
    gender: Joi.string().required().valid('M', 'F'),
    nationality: Joi.string().required(),
    emergencyContact: Joi.string().required().custom(mobile),
    abn: Joi.string().required(),
    nameOfBank: Joi.string().required(),
    bsb: Joi.string().required(),
    accountNumber: Joi.string().required(),
    status: Joi.string().required().valid('Active', 'Pending', 'Reviewing', 'Deactivated'),
  }),
};

const sendEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    subject: Joi.string().required(),
    text: Joi.string().required(),
    attachment: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      fullName: Joi.string(),
      dob: Joi.date(),
      userType: Joi.string(),
      status: Joi.string().valid('Active', 'Pending', 'Reviewing', 'Deactivated'),
      phoneNumber: Joi.string(),
      address: Joi.string(),
      gender: Joi.string().valid('M', 'F'),
      nationality: Joi.string(),
      emergencyContact: Joi.string(),
      abn: Joi.string(),
      nameOfBank: Joi.string(),
      bsb: Joi.string(),
      accountNumber: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  sendEmail,
};
