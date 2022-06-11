const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { documentController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { documentValidation } = require('../../validations');

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
    auth('manageDocuments'),
    upload.array('files'),
    validate(documentValidation.uploadFile),
    documentController.uploadDocument
  )
  .get(auth('manageDocuments'), validate(documentValidation.getFilesByOwner), documentController.getFilesByOwner);
router.route('/:fileKey').get(validate(documentValidation.getFile), documentController.downloadDocument);
router
  .route('/prof-pic')
  .post(
    auth('manageDocuments'),
    upload.array('files'),
    validate(documentValidation.uploadFile),
    documentController.uploadProfilePicture
  );
router.route('/prof-pic/:fileKey').get(validate(documentValidation.getFile), documentController.downloadProfilePicture);

module.exports = router;
