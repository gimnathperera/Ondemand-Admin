const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { jobValidation } = require('../../validations');
const { jobController } = require('../../controllers');

const router = express.Router();

router.route('/').get(auth('manageUserJobs'), validate(jobValidation.getDailyJobs), jobController.getDailyJobs);
router.route('/:userId').get(auth('manageUserJobs'), validate(jobValidation.getJobsByUser), jobController.getJobsByUser);
router.route('/track').post(auth('manageUserJobs'), validate(jobValidation.trackDailyJob), jobController.trackDailyJob);
router
  .route('/track/:trackingId')
  .patch(auth('manageUserJobs'), validate(jobValidation.updateDailyJobTrack), jobController.updateDailyJobTrack);

module.exports = router;
