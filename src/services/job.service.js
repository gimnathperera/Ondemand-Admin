const httpStatus = require('http-status');
const moment = require('moment');
const { userStatus } = require('../config/users');
const { logStatus } = require('../config/logs');
const { jobStatus, jobScheduleType } = require('../config/jobs');
const { Job, User } = require('../models');
const { Log } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const recordService = require('./record.service');
const { findWorkerObject } = require('../utils/functions');
const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../config/logger');

const getAvailableJobsByWorker = async (worker) => {
  const jobs = await Job.aggregate([
    { $unwind: '$workers' },
    { $match: { 'workers.worker': mongoose.Types.ObjectId(worker), status: { $ne: jobStatus.COMPLETED } } },
    {
      $project: {
        _id: '$_id',
        workerStartDate: '$workers.workerStartDate',
        workerEndDate: '$workers.workerEndDate',
        shifts: '$workers.shifts',
      },
    },
  ]);

  return jobs;
};

const getDailyJobTrackById = async (id) => {
  return Log.findById(id);
};

//Cron
const updateJobStatuses = async () => {
  const jobs = await Job.find({
    $or: [{ startDate: moment().format('YYYY-MM-DD') }, { endDate: moment().format('YYYY-MM-DD') }],
    status: { $ne: jobStatus.COMPLETED },
  });
  if (!jobs.length > 0) return true;
  logger.info(`Processing ${jobs.length} jobs...`);

  //updating the status of each job based on the startDate or endDate
  _.map(jobs, async (job) => {
    let statusFlag = moment(job.startDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD');
    Object.assign(job, {
      status: statusFlag ? jobStatus.ACTIVE : jobStatus.COMPLETED,
    });
    await recordService.createRecord({
      job: job.id,
      description: `Job is ${statusFlag ? jobStatus.ACTIVE : jobStatus.COMPLETED}`,
    });
    await job.save();
  });
  logger.info(`${jobs.length} jobs processed...`);

  return true;
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  return Job.findOne({ _id: mongoose.Types.ObjectId(id) }).populate(['workers.worker']);
};

/**
 * Create a job
 * @param {Object} jobBody
 * @returns {Promise<Job>}
 */
const createJob = async (jobBody) => {
  // worker time slot logic for a scheduled job create
  if (jobBody.workers && jobBody.workers.length > 0) {
    const _workers = jobBody.workers;

    // when comparing dates make sure the date values are in 'YYYY-MM-DD' format
    for await (const { worker, workerStartDate, workerEndDate, shifts = [] } of _workers) {
      //check for number of shifts allocated for each jobScheduleType
      if (jobBody.scheduleType == jobScheduleType.EMERGENCY && shifts.length !== 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid number of shifts`);
      }
      if (jobBody.scheduleType == jobScheduleType.SCHEDULED && shifts.length !== 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid number of shifts`);
      }
      if (jobBody.scheduleType == jobScheduleType.SHIFTTED && shifts.length < 3) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid number of shifts`);
      }

      //check for invalid worker startDate comparing with new job start date and worker's new startDate
      if (!moment(jobBody.startDate).isSameOrBefore(workerStartDate)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid workerStartDate for ${worker}`);
      }
      //check for invalid worker endDate comparing with new job start date and worker's new endDate
      if (!moment(jobBody.endDate).isSameOrAfter(workerEndDate)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid workerEndDate for ${worker}`);
      }

      //worker new startTime and endTime check inside of the shifts array coming from request API
      if (shifts.length > 0) {
        _.map(shifts, ({ workerEndTime, workerStartTime }) => {
          if (!moment(workerEndTime, 'hh:mm').isAfter(moment(workerStartTime, 'hh:mm'))) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Invalid workerEndTime for ${worker}`);
          }
        });
      }

      const existingWorker = await userService.getUserById(worker);
      if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found for ${worker}`);
      if (existingWorker.status !== userStatus.ACTIVE) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Worker ${worker} is not Active`);
      }

      //get all the previous active jobs assigned to this worker
      const availableJobs = await getAvailableJobsByWorker(worker);

      //check for the time conflicts in job shifts comparing to new shifts coming from request API
      _.map(availableJobs, (existingJob) => {
        // if new record startDate > old record endDate || new record endDate < old record startDate
        if (
          !(
            moment(workerEndDate).isBefore(existingJob.workerStartDate) ||
            moment(workerStartDate).isAfter(existingJob.workerEndDate)
          )
        ) {
          // Iterate through new shifts coming from request API
          _.map(shifts, (newShift) => {
            const newStartTime = moment(newShift.workerStartTime, 'hh:mm');
            const newEndTime = moment(newShift.workerEndTime, 'hh:mm');

            // Iterate through old shifts assigned to this worker
            _.map(existingJob.shifts, (existingShift) => {
              const oldStartTime = moment(existingShift.workerStartTime, 'hh:mm');
              const oldEndTime = moment(existingShift.workerEndTime, 'hh:mm');

              if (!(newEndTime.isBefore(oldStartTime) || newStartTime.isAfter(oldEndTime))) {
                throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Given time slot is not available for worker ${worker}`);
              }
            });
          });
        }
      });
    }
  }

  const newJob = await Job.create(jobBody);

  // create the record saying the job is created
  if (newJob.workers.length > 0) {
    const _workers = _.map(newJob.workers, (worker) => worker.worker);
    await recordService.createRecord({
      job: newJob.id,
      description: `Job is created and assigned to ${_workers}`,
    });
  } else {
    await recordService.createRecord({ job: newJob.id, description: 'Job is created' });
  }

  return newJob;
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJobById = async (jobId, updateBody) => {
  const existingJob = await getJobById(jobId);
  if (!existingJob) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  if (updateBody.workers && updateBody.workers.length > 0) {
    const _workers = updateBody.workers;

    // when comparing dates make sure the date values are in 'YYYY-MM-DD' format
    for await (const { worker, workerStartDate, workerEndDate, shifts = [] } of _workers) {
      //check for number of shifts allocated for each jobScheduleType
      if (existingJob.scheduleType == jobScheduleType.EMERGENCY && shifts.length !== 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid number of shifts`);
      }
      if (existingJob.scheduleType == jobScheduleType.SCHEDULED && shifts.length !== 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid number of shifts`);
      }
      if (existingJob.scheduleType == jobScheduleType.SHIFTTED && shifts.length < 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid number of shifts`);
      }

      //check for invalid worker startDate comparing with new job start date and worker's new startDate
      if (!moment(existingJob.startDate).isSameOrBefore(workerStartDate)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid workerStartDate for ${worker}`);
      }
      //check for invalid worker endDate comparing with new job start date and worker's new endDate
      if (!moment(existingJob.endDate).isSameOrAfter(workerEndDate)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid workerEndDate for ${worker}`);
      }

      //worker new startTime and endTime check inside of the shifts array coming from request API
      // if (shifts?.length >= 3) {
      //   _.map(shifts, ({ workerEndTime, workerStartTime }) => {
      //     if (!moment(workerEndTime, 'hh:mm').isSameOrAfter(moment(workerStartTime, 'hh:mm'))) {
            
      //       throw new ApiError(httpStatus.BAD_REQUEST, `Invalid workerEndTime for ${worker}`);
      //     }
      //   });
      // }

      const existingWorker = await userService.getUserById(worker);
      if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found for ${worker}`);
      if (existingWorker.status !== userStatus.ACTIVE) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Worker ${worker} is not Active`);
      }

      //get all the previous active jobs assigned to this worker
      const availableJobs = await getAvailableJobsByWorker(worker);

      //check for the time conflicts in job shifts comparing to new shifts coming from request API
      _.map(availableJobs, (existingJob) => {
        if (existingJob._id != jobId) {
          // if new record startDate > old record endDate || new record endDate < old record startDate
          if (
            !(
              moment(workerEndDate).isBefore(existingJob.workerStartDate) ||
              moment(workerStartDate).isAfter(existingJob.workerEndDate)
            )
          ) {
            // Iterate through new shifts coming from request API
            _.map(shifts, (newShift) => {
              const newStartTime = moment(newShift.workerStartTime, 'hh:mm');
              const newEndTime = moment(newShift.workerEndTime, 'hh:mm');

              // Iterate through old shifts assigned to this worker
              _.map(existingJob.shifts, (existingShift) => {
                const oldStartTime = moment(existingShift.workerStartTime, 'hh:mm');
                const oldEndTime = moment(existingShift.workerEndTime, 'hh:mm');

                if (!(newEndTime.isBefore(oldStartTime) || newStartTime.isAfter(oldEndTime))) {
                  throw new ApiError(
                    httpStatus.UNPROCESSABLE_ENTITY,
                    `Given time slot is not available for worker ${worker}`
                  );
                }
              });
            });
          }
        }
      });
    }

    const updatedWorkers = [];

    for await (const wrkr_ of _workers) {
      const wrkr = await User.findById(wrkr_.worker);
      updatedWorkers.push(`${wrkr.fullName}`);
    }

    await recordService.createRecord({
      job: jobId,
      description: `Assigned to ${updatedWorkers}`,
    });
  }

  Object.assign(existingJob, updateBody);
  await existingJob.save();
  return existingJob;
};

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  const jobs = await Job.paginate(filter, options);
  return jobs;
};

/**
 * Create daily user job record
 * @param {Object} logBody
 * @returns {Promise<Log>}
 */
const trackDailyJob = async (logBody) => {
  const job = await getJobById(logBody.job);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  if (job.status !== jobStatus.ACTIVE) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Job is not Active');
  }

  const existingWorker = await userService.getUserById(logBody.worker);
  if (!existingWorker) throw new ApiError(httpStatus.NOT_FOUND, `Worker not found`);

  if (existingWorker.status !== userStatus.ACTIVE) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Worker is not Active`);
  }

  if (!findWorkerObject(job.workers, logBody.worker)) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Worker is not assigned to this job`);
  }
  const dailyTrack = {
    ...logBody,
    ...{
      logginDate: moment().format('YYYY-MM-DD'),
      status: logStatus.ACTIVE,
      startTime: moment().format('HH:mm'),
      endTime: '',
      comment: '',
    },
  };

  return Log.create(dailyTrack);
};

/**
 * Update job by id
 * @param {ObjectId} trackingId
 * @param {Object} updateBody
 * @returns {Promise<Log>}
 */
const updateDailyJobTrackById = async (trackingId, updateBody) => {
  const track = await getDailyJobTrackById(trackingId);
  if (!track) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Record not found');
  }
  if (track.status !== logStatus.ACTIVE) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, `Time has been already updated or Record is not available`);
  }

  const updatingTrack = {
    ...updateBody,
    ...{
      endTime: moment().format('HH:mm'),
      status: logStatus.COMPLETED,
    },
  };

  Object.assign(track, updatingTrack);
  await track.save();

  await recordService.createRecord({
    job: track.job,
    description: track.comment,
  });

  return track;
};

module.exports = {
  createJob,
  updateJobById,
  getJobById,
  queryJobs,
  trackDailyJob,
  updateDailyJobTrackById,
  updateJobStatuses,
};
