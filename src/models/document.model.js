const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const documentSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    docName: {
      type: String,
      required: true,
    },
    docKey: {
      type: String,
      required: true,
    },
    docLink: {
      type: String,
      required: true,
    },
    docType: {
      type: String,
      required: true,
    },
    isProfilePic: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);

/**
 * @typedef Document
 */
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;

// POST request to create the time log record with required fields
// PATCH request to update the created record by providing the previously created recordId and other remaining fields
