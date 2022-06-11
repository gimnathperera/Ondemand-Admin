const httpStatus = require('http-status');
const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const  messageService  = require('../services/message.service');

const createMessage = catchAsync(async (req, res) => {
  const newMessage = await messageService.createMessage(req.body);
  res.status(httpStatus.CREATED).send(newMessage);
});

const getMessages = catchAsync(async (req, res) => {
  const filters = req.query.status || '';
  const result = await messageService.queryMessages(filters);

  res.send(result);
});

const getChatByUser = catchAsync(async (req, res) => {
  const result = await messageService.getChatByUser(req.params.userId);

  res.send(result);
});

const updateMessage = catchAsync(async (req, res) => {
  const updatedMessage = await messageService.updateMessageById(req.params.userId, req.body);
  res.send(updatedMessage);
});

const getMessagesByTo = catchAsync(async (req, res) => {
  const messages = await messageService.getMessagesByTo(req.params.to);
  res.send(messages);
});

const getMessagesByFrom = catchAsync(async (req, res) => {
  const messages = await messageService.getMessagesByFrom(req.params.from);
  res.send(messages);
});

const getAdminList = catchAsync(async (req, res) => {
  const adminList = await messageService.getAdminList();
  res.send(adminList);
});

module.exports = {
  createMessage,
  updateMessage,
  getMessagesByTo,
  getMessagesByFrom,
  getAdminList,
  getMessages,
  getChatByUser,
};
