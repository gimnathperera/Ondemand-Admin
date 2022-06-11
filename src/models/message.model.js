const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { messageStatus } = require('../config/messages');

const messageSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: messageStatus,
      default: 'Unread',
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    isFromAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

// POST request to create the time log record with required fields
// PATCH request to update the created record by providing the previously created recordId and other remaining fields
