const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { paymentController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { paymentValidation } = require('../../validations');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/', (err) => {
      cb(null, './uploads/');
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router
  .route('/')
  .post(
    auth('managePayments'),
    upload.array('files'),
    validate(paymentValidation.submitInvoice),
    paymentController.submitInvoice
  );

router.route('/').get(auth('managePayments'), validate(paymentValidation.getPaySlips), paymentController.getPaySlips);

module.exports = router;
