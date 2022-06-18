const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { jobStatus, jobLocationTypes, jobType, jobScheduleType } = require('../config/jobs');

// admin job routes validations
const createJob = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    note: Joi.string(),
    scheduleType: Joi.string()
      .required()
      .valid(jobScheduleType.EMERGENCY, jobScheduleType.SCHEDULED, jobScheduleType.SHIFTTED),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
    location: Joi.object()
      .keys({
        type: Joi.string().required().valid(jobLocationTypes.POINT),
        coordinates: Joi.array().items(Joi.number().required()).min(2).required(),
      })
      .required(),
    status: Joi.string().required().valid(jobStatus.PENDING, jobStatus.ACTIVE, jobStatus.COMPLETED),
    workers: Joi.array()
      .items(
        Joi.object().keys({
          worker: Joi.string().custom(objectId),
          workerStartDate: Joi.date().iso().required(),
          workerEndDate: Joi.date().iso().min(Joi.ref('workerStartDate')).required(),
          shifts: Joi.array()
            .items(
              Joi.object().keys({
                dates: Joi.array().required(),
                times: Joi.array()
                  .items(
                    Joi.object().keys({
                      workerStartTime: Joi.string()
                        .regex(/^([0-9]{2})\:([0-9]{2})$/)
                        .required(),
                      workerEndTime: Joi.string()
                        .regex(/^([0-9]{2})\:([0-9]{2})$/)
                        .required(),
                    })
                  )
                  .min(1)
                  .required(),
              })
            )
            .min(1)
            .required(),
        })
      )
      .min(1),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
};

const updateJob = {
  params: Joi.object().keys({
    jobId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      location: Joi.object().keys({
        type: Joi.string().required().valid(jobLocationTypes.POINT),
        coordinates: Joi.array().items(Joi.number().required()).min(2),
      }),
      note: Joi.string(),
      status: Joi.string().valid(jobStatus.PENDING, jobStatus.ACTIVE, jobStatus.COMPLETED),
      workers: Joi.array()
        .items(
          Joi.object().keys({
            worker: Joi.string().custom(objectId),
            workerStartDate: Joi.date().iso().required(),
            workerEndDate: Joi.date().iso().min(Joi.ref('workerStartDate')).required(),
            shifts: Joi.array()
              .items(
                Joi.object().keys({
                  dates: Joi.array().required(),
                  times: Joi.array().required(),
                })
              )
              .min(1)
              .required(),
          })
        )
        .min(1),
    })
    .min(1),
};

const deleteJob = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getJobRecordsByJobId = {
  params: Joi.object().keys({
    jobId: Joi.required().custom(objectId),
  }),
};

// user job routes validations
const getDailyJobs = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    date: Joi.date().iso(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJobsByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    status: Joi.string(),
  }),
};

const trackDailyJob = {
  body: Joi.object().keys({
    job: Joi.string().custom(objectId).required(),
    worker: Joi.string().custom(objectId).required(),
    location: Joi.object()
      .keys({
        type: Joi.string().required().valid(jobLocationTypes.POINT),
        coordinates: Joi.array().items(Joi.number().required()).min(2).required(),
      })
      .required(),
  }),
};

const updateDailyJobTrack = {
  params: Joi.object().keys({
    trackingId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    location: Joi.object()
      .keys({
        type: Joi.string().required().valid(jobLocationTypes.POINT),
        coordinates: Joi.array().items(Joi.number().required()).min(2).required(),
      })
      .required(),
    comment: Joi.string().required(),
  }),
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getDailyJobs,
  trackDailyJob,
  updateDailyJobTrack,
  getJobRecordsByJobId,
  getJobsByUser,
};
