const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { jobValidation } = require('../../validations');
const { jobController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageJobs'), validate(jobValidation.createJob), jobController.createJob)
  .get(auth('getJobs'), validate(jobValidation.getJobs), jobController.getJobs);

router
  .route('/:jobId')
  .get(auth('getJobs'), validate(jobValidation.getJob), jobController.getJob)
  .patch(auth('manageJobs'), validate(jobValidation.updateJob), jobController.updateJob);

router
  .route('/records/:jobId')
  .get(auth('getJobs'), validate(jobValidation.getJobRecordsByJobId), jobController.getJobRecordsByJobId);

router.get('/cron', jobController.updateJobStatuses);

router.route('/job-workers/:jobId').get(auth('manageJobs'), validate(jobValidation.getJobWorkers), jobController.getJobWorkers);

module.exports = router;
