const httpStatus = require('http-status');
const _ = require('lodash');
const moment = require('moment');

const catchAsync = require('../utils/catchAsync');
const jobService = require('../services/job.service');
const userService = require('../services/user.service');
const recordService = require('../services/record.service');
const pick = require('../utils/pick');
const { userStatus } = require('../config/users');
const ApiError = require('../utils/ApiError');

//  Admin job routes
const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

const updateJob = catchAsync(async (req, res) => {
  const job = await jobService.updateJobById(req.params.jobId, req.body);
  res.send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'workers.worker, customer' }; //populate workers and customer
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

const getJobWorkers = catchAsync(async (req, res) => {
  const jobId = req.params.jobId;

  let filter = pick(req.query, ['worker']);
  if (req?.query?.startDate && req?.query?.endDate) {
    filter = {
      ...filter,
      ...{
        startDate: moment(req.query.startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        endDate: moment(req.query.endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
      },
    };
  }

  const result = await jobService.getJobWorkers(filter, jobId);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const getJobRecordsByJobId = catchAsync(async (req, res) => {
  const result = await recordService.getRecordsByJobId(req.params.jobId);

  res.send(result);
});

//  User job routes
const getDailyJobs = catchAsync(async (req, res) => {
  //checking for user & user status
  const existingWorker = await userService.getUserById(req.query.userId);
  if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found for ${req.query.userId}`);
  if (existingWorker.status !== userStatus.ACTIVE) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Worker ${req.query.userId} is not Active`);
  }

  const givenDate = moment(req.query.date).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');

  const filter = {
    ...pick(req.query, ['status']),
    'workers.worker': req.query.userId,
  };

  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'customer' }; //populate workers
  let result = await jobService.queryJobs(filter, options);

  if (result?.results) {
    const updatedResults = [];
    const finalResults = [];
    for await (const job of result.results) {
      if (job?.workers.length > 0) {
        _workers = _.reject(job.workers, (obj) => obj.worker != req.query.userId); //removing all workers form workers[] which is not appropriate for the given userId
        job.workers = _workers;
        updatedResults.push(job);
      }
    }

    for await (const job of updatedResults) {
      //compare the given date with worker's startDate and endDate
      //choose only data in between the date range
      const _workerStartDate = moment(job.workers?.[0]?.workerStartDate).format('YYYY-MM-DD');
      const _workerEndDate = moment(job.workers?.[0]?.workerEndDate).format('YYYY-MM-DD');

      if (moment(givenDate).isSameOrBefore(_workerEndDate) && moment(givenDate).isSameOrAfter(_workerStartDate)) {
        finalResults.push(job);
      }
    }

    // assign workers cleaned jobs to results array
    result.results = finalResults;
  }

  res.send(result);
});

const trackDailyJob = catchAsync(async (req, res) => {
  const track = await jobService.trackDailyJob(req.body);
  res.status(httpStatus.CREATED).send(track);
});

const updateDailyJobTrack = catchAsync(async (req, res) => {
  const updatedTrack = await jobService.updateDailyJobTrackById(req.params.trackingId, req.body);
  res.send(updatedTrack);
});

const getJobsByUser = catchAsync(async (req, res) => {
  //checking for user & user status
  const existingWorker = await userService.getUserById(req.params.userId);
  if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found for ${req.params.userId}`);
  if (existingWorker.status !== userStatus.ACTIVE) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Worker ${req.params.userId} is not Active`);
  }

  const filter = {
    ...pick(req.query, ['status']),
    'workers.worker': req.params.userId,
  };

  const options = { populate: 'customer' }; //populate workers
  let result = await jobService.queryJobs(filter, options);

  const updatedResults = [];
  if (result?.results) {
    for await (const job of result.results) {
      if (job?.workers.length > 0) {
        _workers = _.reject(job.workers, (obj) => obj.worker != req.params.userId); //removing all workers form workers[] which is not appropriate for the given userId

        job.workers = _workers;
        updatedResults.push(job);
      }
    }
  }

  res.send(updatedResults);
});

// Cronjob
const updateJobStatuses = catchAsync(async (req, res) => {
  const updatedTrack = await jobService.updateJobStatuses();
  res.send({ status: updatedTrack });
});

module.exports = {
  createJob,
  updateJob,
  getJobs,
  getJob,
  getDailyJobs,
  trackDailyJob,
  updateDailyJobTrack,
  updateJobStatuses,
  getJobRecordsByJobId,
  getJobsByUser,
  getJobWorkers,
};
