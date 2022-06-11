const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { messageValidation } = require('../../validations');
const { messageController } = require('../../controllers');

const router = express.Router();

router.route('/').post(auth('manageMessages'), validate(messageValidation.createMessage), messageController.createMessage);
router
  .route('/')
  .get(auth('manageAdminOnlyMessages'), validate(messageValidation.getMessages), messageController.getMessages);
router
  .route('/chat/:userId')
  .get(auth('manageMessages'), validate(messageValidation.getChatByUser), messageController.getChatByUser);
router
  .route('/:userId')
  .patch(auth('manageMessages'), validate(messageValidation.updateMessage), messageController.updateMessage);
router
  .route('/to/:to')
  .get(auth('manageMessages'), validate(messageValidation.getMessagesByTo), messageController.getMessagesByTo);
router
  .route('/from/:from')
  .get(auth('manageMessages'), validate(messageValidation.getMessagesByFrom), messageController.getMessagesByFrom);
router.route('/admin-list').get(auth('manageMessages'), messageController.getAdminList);

module.exports = router;
