const mongoose = require('mongoose');
const _ = require('lodash');

const { Message, User } = require('../models');
const { userStatus } = require('../config/users');

/**
 * Create a message
 * @param {Object} msgData
 * @returns {Promise<Message>}
 */
const createMessage = async (msgData) => {
  return Message.create(msgData);
};

/**
 * Get message by from
 * @param {ObjectId} id
 * @returns {Promise<Message[]>}
 */
const getMessagesByFrom = async (from) => {
  return await Message.find({ from: mongoose.Types.ObjectId(from) });
};

/**
 * Get message by to
 * @param {ObjectId} id
 * @returns {Promise<Message[]>}
 */
const getMessagesByTo = async (to) => {
  return await Message.find({ to: mongoose.Types.ObjectId(to) });
};

/**
 * Get message by id
 * @param {ObjectId} id
 * @returns {Promise<Message>}
 */
const getMessageById = async (id) => {
  return Message.findById(id);
};

/**
 * Update chat (all messages for a specific user)
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Message>}
 */

const updateMessageById = async (userId, updateBody) => {
  await Message.updateMany(
    {
      $or: [
        {
          to: mongoose.Types.ObjectId(userId),
        },
        {
          from: mongoose.Types.ObjectId(userId),
        },
      ],
    },
    { $set: { status: 'Read' } }
  );

  return { status: true };
};

/**
 * Get admin list messages
 * @param {ObjectId} id
 * @returns {Promise<User[]>}
 */
const getAdminList = async () => {
  return await User.find({ role: 'Admin' }, { role: 1, firstName: 1, lastName: 1 });
};

/**
 * Query for messages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMessages = async (filter) => {
  const activeUsers = await User.find({ status: userStatus.ACTIVE, role: 'Worker' });
  let _messages = [];
  if (activeUsers.length > 0) {
    for await (const { id, fullName } of activeUsers) {
      const individualMsgs = filter
        ? await Message.find()
            .or([{ to: mongoose.Types.ObjectId(id) }, { from: mongoose.Types.ObjectId(id) }])
            .and({ status: filter })
            .sort({ createdAt: -1 })
        : await Message.find()
            .or([{ to: mongoose.Types.ObjectId(id) }, { from: mongoose.Types.ObjectId(id) }])
            .sort({ createdAt: -1 });

      _messages = [..._messages, { worker: { name: `${fullName}`, id }, messages: individualMsgs }];
    }
  }

  return _messages;
};

/**
 * Get admin list messages
 * @param {ObjectId} userId
 * @returns {Promise<Message[]>}
 */
const getChatByUser = async (userId) => {
  return await Message.find()
    .or([{ to: mongoose.Types.ObjectId(userId) }, { from: mongoose.Types.ObjectId(userId) }])
    .sort({ createdAt: 1 })
    .populate(['to', 'from']);
};

module.exports = {
  createMessage,
  getMessagesByFrom,
  getMessagesByTo,
  getMessageById,
  updateMessageById,
  getAdminList,
  queryMessages,
  getChatByUser,
};
