const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { logStatusEnums } = require('../config/logs');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const logSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
      required: true,
    },
    worker: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    logginDate: {
      type: Date,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: logStatusEnums,
      default: 'Active',
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    startTime: { type: String, required: true, trim: true },
    endTime: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
logSchema.plugin(toJSON);
logSchema.plugin(paginate);

/**
 * @typedef Log
 */
const Log = mongoose.model('Log', logSchema);

module.exports = Log;

// POST request to create the time log record with required fields
// PATCH request to update the created record by providing the previously created recordId and other remaining fields
