const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const documentService = require('../services/document.service');
const { Document } = require('../models');
const { removeFileBulk } = require('../utils/functions');

const cleanPreviousDocument = async (ownerId, documentKey) => {
  await Document.deleteMany({ owner: ownerId, docKey: documentKey });
  await documentService.deleteFileFromS3(documentKey);
};

const uploadDocument = catchAsync(async (req, res) => {
  const files = req.files;
  const { owner } = req.body;
  if (!files) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No files received');
  }

  const docRecords = [];
  for await (const file of files) {
    await cleanPreviousDocument(owner, file?.filename);
    const response = await documentService.uploadDocument(file);
    const dataObject = {
      owner,
      docName: file?.filename,
      docKey: response?.key,
      docLink: response?.Location,
      docType: file?.mimetype,
      isProfilePic: false,
    };

    const document = await documentService.updateDocumentDetails(dataObject);
    docRecords.push(document);
  }
  await removeFileBulk(); //clean uploads folder
  res.send(docRecords);
});

const downloadDocument = catchAsync(async (req, res) => {
  const fileKey = req.params.fileKey;
  const response = await documentService.downloadDocument(fileKey);

  response.pipe(res);
});

const getFilesByOwner = catchAsync(async (req, res) => {
  const { owner } = req.query;
  const result = await documentService.getFilesByOwner(owner);

  res.send(result);
});

const cleanPreviousProfilePicture = async (ownerId) => {
  try {
    //delete the file from the local database
    await Document.deleteMany({ isProfilePic: true, owner: ownerId });

    //delete the file from aws s3
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cleaning file failed');
  }
};

const uploadProfilePicture = catchAsync(async (req, res) => {
  const files = req.files;
  const { owner } = req.body;
  if (!files) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No files received');
  }

  await cleanPreviousProfilePicture(owner);

  const docRecords = [];
  for await (const file of files) {
    const response = await documentService.uploadProfilePicture(file);

    const dataObject = {
      owner,
      docName: file?.filename,
      docKey: response?.key,
      docLink: response?.Location,
      docType: file?.mimetype,
      isProfilePic: true,
    };

    const document = await documentService.updateDocumentDetails(dataObject);
    docRecords.push(document);
  }

  await removeFileBulk(); //clean uploads folder
  res.send(docRecords);
});

const downloadProfilePicture = catchAsync(async (req, res) => {
  const fileKey = req.params.fileKey;
  const response = await documentService.downloadProfilePicture(fileKey);

  response.pipe(res);
});

const getProfilePictureByOwner = catchAsync(async (req, res) => {
  const { owner } = req.query;
  const result = await documentService.getProfilePicByOwner(owner);

  res.send(result);
});

module.exports = {
  uploadDocument,
  downloadDocument,
  getFilesByOwner,
  uploadProfilePicture,
  downloadProfilePicture,
  getProfilePictureByOwner,
};
