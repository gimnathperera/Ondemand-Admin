const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const emailService = require('../services/email.service');
const userService = require('../services/user.service');
const documentService = require('../services/document.service');
const { Message } = require('../models');
const { userStatus } = require('../config/users');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const documents = await documentService.getProfilePicByOwner(user?.id, 'Worker');
  const docKey = documents.length > 0 ? documents[0]?.docKey : null;
  const {
    userType,
    role,
    status,
    isEmailVerified,
    fullName,
    dob,
    email,
    phoneNumber,
    address,
    createdAt,
    userId,
    id,
    gender,
    nationality,
    dayShiftPayment,
    nightShiftPayment,
    emergencyContact,
    abn,
    nameOfBank,
    bsb,
    accountNumber,
  } = user;
  const payload = {
    userType,
    role,
    status,
    isEmailVerified,
    fullName,
    dob,
    email,
    phoneNumber,
    address,
    createdAt,
    userId,
    id,
    gender,
    nationality,
    dayShiftPayment,
    nightShiftPayment,
    emergencyContact,
    abn,
    nameOfBank,
    bsb,
    accountNumber,
    profPic: docKey,
  };

  res.send(payload);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);

  // send the thread starting message if the user becomes an active user of the system
  if (req?.body?.status == userStatus.ACTIVE) {
    const msgData = {
      to: user?._id,
      from: req?.user?._id,
      description: 'Your profile details has been updated, Use this thread to start a conversion with admin :)',
      isFromAdmin: true,
    };

    await Message.create(msgData);
  }
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendEmail = catchAsync(async (req, res) => {
  const { email, subject, text, attachment } = req.body;
  await emailService.sendEmail(email, subject, text, attachment);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  sendEmail,
};
