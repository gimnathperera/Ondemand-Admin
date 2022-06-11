const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
    },
    worker: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    paySlipKey: {
      type: String,
      required: true,
      unique: true,
    },
    totalPayment: {
      type: String,
      required: true,
    },
    isSend: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

// POST request to create the time log record with required fields
// PATCH request to update the created record by providing the previously created recordId and other remaining fields
