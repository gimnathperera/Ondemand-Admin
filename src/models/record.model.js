const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const recordSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
recordSchema.plugin(toJSON);
recordSchema.plugin(paginate);

/**
 * @typedef Record
 */
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;

// POST request to create the time log record with required fields
// PATCH request to update the created record by providing the previously created recordId and other remaining fields
