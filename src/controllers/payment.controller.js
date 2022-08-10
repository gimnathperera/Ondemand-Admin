const httpStatus = require('http-status');
const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');

const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { generatePaySlipName, removeTempFile, generateInvoiceId } = require('../utils/functions');
const { paymentService, pdfService } = require('../services');
const reportService = require('../services/report.service');

const { uploadPaySlip } = require('../s3');
const { payment } = require('../config/config');

// Invoice submit by worker every fortnite (15th & 30th)
const submitInvoice = catchAsync(async (req, res) => {
  const files = req.files;
  const { worker, startDate, endDate } = req.body;
  if (files?.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No invoice received');
  }
  // get the invoice file and send the file to admin via email
  const workerData = await paymentService.submitInvoice(worker, files?.[0]?.filename);

  // payslip pdf key
  const paySlipName = generatePaySlipName(workerData?.userId);

  // generate invoiceId
  const invoiceId = generateInvoiceId(workerData?.userId);

  const filter = {
    worker,
    status: 'Completed',
    createdAt: {
      $gte: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
      $lt: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
    },
  };

  // change the payment calucation logic
  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'worker, job' }; //populate workers
  const response = await reportService.queryReports(filter, options);
  let totalPayment = 0;

  if (response?.results.length > 0) {
    const { results } = response;
    const records = _.map(results, (record) =>
      _.pick(record, ['logginDate', 'startTime', 'endTime', 'workingHours', 'job.name'])
    );

    const FORMAT = 'HH:mm';
    const TOFORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

    const beforeTime = moment('22:00', FORMAT).format(TOFORMAT);
    const afterTime = moment('06:00', FORMAT).add(1, 'days').format(TOFORMAT);

    let nightHours = 0;
    let dayHours = 0;

    records.map((record) => {
      const time = moment(record?.startTime, FORMAT).format(TOFORMAT);

      if (moment(time).isSameOrAfter(beforeTime)) {
        console.log('is between');
        nightHours = nightHours + Number(record?.workingHours);
      } else {
        dayHours = dayHours + Number(record?.workingHours);
      }
    });

    totalPayment = nightHours * Number(workerData?.nightShiftPayment) + dayHours * Number(workerData?.dayShiftPayment);
  }

  const pdfData = {
    invoiceId,
    paySlipName,
    totalPayment,
    workerAddress: workerData?.address,
    workerEmail: workerData?.email,
    workerFullName: workerData?.fullName,
  };

  // generate a payslip pdf
  const genResponse = await pdfService.generatePaySlip(pdfData);

  // push the generated pdf to s3
  const paySlipFile = await uploadPaySlip(genResponse, paySlipName);

  // update the db
  const payload = {
    invoiceId,
    worker,
    paySlipKey: paySlipFile?.key,
    totalPayment,
  };

  // send the response to client
  await paymentService.createPaySlipRecord(payload);

  // clear the tempory document
  await removeTempFile(genResponse);

  res.send({ message: 'Invoice has been submitted successfully', status: true });
});

const getPaySlips = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['isSend', 'worker']);

  if (req?.query?.startDate && req?.query?.endDate) {
    filter = {
      ...filter,
      ...{
        createdAt: {
          $gte: moment(req.query.startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          $lt: moment(req.query.endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        },
      },
    };
  }
  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'worker' }; //populate workers

  const result = await paymentService.queryPaySlips(filter, options);
  res.send(result);
});

// change the payment calucation logic
const getFortnitePayment = catchAsync(async (req, res) => {
  const filter = {
    worker: req.params.workerId,
    status: 'Completed',
    createdAt: {
      $gte: moment(req.query.startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
      $lt: moment(req.query.endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
    },
  };

  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'worker, job' }; //populate workers
  const response = await reportService.queryReports(filter, options);
  if (response?.results.length > 0) {
    // using above data crete an object as following;
    const { results } = response;
    const records = _.map(results, (record) =>
      _.pick(record, ['logginDate', 'startTime', 'endTime', 'workingHours', 'job.name'])
    );
    const _records = records.map((el) => ({
      ...el,
      ...{
        total: el.workingHours * 25,
        logginDate: moment(el.logginDate).format('MM/DD'),
      },
    }));
    // generate invoiceId
    const invoiceId = generateInvoiceId(results?.[0]?.worker?.userId);

    const payload = {
      invoiceId,
      invoiceName: invoiceId,
      records: _records,
      totalPayment: _.sumBy(records, 'workingHours') * payment.paymentForHour,
      totalWorkingHours: _.sumBy(records, 'workingHours'),
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      bsb: results?.[0]?.worker?.bsb,
      accountNumber: results?.[0]?.worker?.accountNumber,
      nameOfBank: results?.[0]?.worker?.nameOfBank,
      workerAddress: results?.[0]?.worker?.address,
      phoneNumber: results?.[0]?.worker?.phoneNumber,
      email: results?.[0]?.worker?.email,
    };
    const createdInvoice = await pdfService.generateInvoice(payload);

    let file = fs.createReadStream(createdInvoice);

    file.pipe(res);
  } else {
    return res.send({ message: 'No records found', status: false });
  }
});

module.exports = {
  submitInvoice,
  getPaySlips,
  getFortnitePayment,
};
