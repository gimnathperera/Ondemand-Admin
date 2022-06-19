const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { jobStatuses, jobScheduleTypes } = require('../config/jobs');
const { toJSON, paginate } = require('./plugins');

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

const timeSchema = new mongoose.Schema({
  workerStartTime: { type: String, required: true, trim: true },
  workerEndTime: { type: String, required: true, trim: true },
});

const shiftSchema = new mongoose.Schema({
  dates: { type: [String], required: true },
  times: [timeSchema],
});

const jobWorkerSchema = new mongoose.Schema({
  worker: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  workerStartDate: { type: Date, required: true, trim: true },
  workerEndDate: { type: Date, required: true, trim: true },
  shifts: [shiftSchema],
});

const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    jobId: {
      type: Number,
    },
    scheduleType: {
      type: String,
      enum: jobScheduleTypes,
      required: true,
    },

    workers: { type: [jobWorkerSchema], required: true },

    startDate: {
      type: Date,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
      required: true,
      trim: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    status: {
      type: String,
      enum: jobStatuses,
      default: 'Pending',
      required: true,
    },
    note: {
      type: String,
      default: 'N/A',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);
jobSchema.plugin(AutoIncrement, { inc_field: 'jobId' });

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
