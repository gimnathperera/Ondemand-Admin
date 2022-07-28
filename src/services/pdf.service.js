const pdf = require('pdf-creator-node');
const path = require('path');
const fs = require('fs');
const httpStatus = require('http-status');
const moment = require('moment');

const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

const generatePaySlip = async ({ invoiceId, paySlipName, totalPayment, workerAddress, workerEmail, workerFullName }) => {
  try {
    // today as invoice received date
    const invoiceDate = moment().format('YYYY-MM-DD');

    const template = path.resolve(__dirname, `../public/payslip.html`);
    const outputPdf = path.resolve(__dirname, `../temp/${paySlipName}`);

    if (!fs.existsSync(template)) {
      logger.error(`X payslip template not found`);
    }

    // Read HTML Template
    const html = fs.readFileSync(template, 'utf8');

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
    };

    const document = {
      html: html,
      data: {
        invoiceId,
        totalPayment,
        invoiceDate,
        workerAddress,
        workerEmail,
        workerFullName,
      },
      path: outputPdf,
      type: '',
    };

    const response = await pdf.create(document, options);
    logger.info(`✓ Payslip generated successfully`);
    return response?.filename;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};
const generateInvoice = async ({
  invoiceId,
  invoiceName,
  totalPayment,
  records,
  totalWorkingHours,
  startDate,
  endDate,
  bsb,
  accountNumber,
  nameOfBank,
  workerAddress,
  phoneNumber,
  email,
}) => {
  try {
    // today as invoice received date
    const invoiceDate = moment().format('YYYY-MM-DD');

    const template = path.resolve(__dirname, `../public/invoice.html`);
    const outputPdf = path.resolve(__dirname, `../temp/${invoiceName.replaceAll('/', '')}.pdf`);

    if (!fs.existsSync(template)) {
      logger.error(`X payslip template not found`);
    }

    // Read HTML Template
    const html = fs.readFileSync(template, 'utf8');

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
    };

    const document = {
      html: html,
      data: {
        invoiceId,
        invoiceName,
        totalPayment,
        records,
        totalWorkingHours,
        startDate: moment(startDate).format('YYYY/MM/DD'),
        endDate: moment(endDate).format('YYYY/MM/DD'),
        invoiceDate,
        bsb,
        accountNumber,
        nameOfBank,
        workerAddress,
        phoneNumber,
        email,
      },
      path: outputPdf,
      type: '',
    };

    const response = await pdf.create(document, options);
    logger.info(`✓ Invoice generated successfully`);
    return response?.filename;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
};

module.exports = {
  generatePaySlip,
  generateInvoice,
};
