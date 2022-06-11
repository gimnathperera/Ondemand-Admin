const mongoose = require('mongoose');
const { userStatus } = require('../config/users');

const { Document } = require('../models');
const { uploadFile, downloadFile, uploadProfilePic, downloadProfilePic, deleteDocument } = require('../s3');
const userService = require('../services/user.service');

/**
 * Upload a document(s)
 * @param {Object} recordBody
 * @returns {Promise<Document>}
 */
const uploadDocument = async (recordBody) => {
  const result = await uploadFile(recordBody);
  return result;
};

/**
 * Update document details
 * @param {Object} reocrdBody
 * @returns {Promise<Document>}
 */
const updateDocumentDetails = async (documentData) => {
  const updatedDocRecord = await Document.create(documentData);

  // Update the user status as "Reviewing"
  const worker = await userService.getUserById(updatedDocRecord.owner);

  if (worker.status == userStatus.PENDING) {
    await userService.updateUserById(updatedDocRecord.owner, { status: userStatus.REVIEWING });
  }

  return updatedDocRecord;
};

/**
 * Download a document(s)
 * @param {String} fileKey
 * @returns {Promise<Document>}
 */
const downloadDocument = async (fileKey) => {
  const result = await downloadFile(fileKey);
  return result;
};

/**
 * Get a document(s) by owner
 * @param {String} owner
 * @param {String} ownerType
 * @returns {Promise<Document[]>}
 */
const getFilesByOwner = async (owner) => {
  const result = await Document.find({ owner: mongoose.Types.ObjectId(owner) });
  return result;
};

/**
 * Get a document(s) by owner
 * @param {String} owner
 * @param {String} ownerType
 * @returns {Promise<Document[]>}
 */
const getProfilePicByOwner = async (owner) => {
  const result = await Document.find({ owner: mongoose.Types.ObjectId(owner), isProfilePic: true });
  return result;
};

/**
 * Upload a profile pic(s)
 * @param {Object} recordBody
 * @returns {Promise<Document>}
 */
const uploadProfilePicture = async (recordBody) => {
  const result = await uploadProfilePic(recordBody);
  return result;
};

/**
 * Download a pic(s)
 * @param {String} fileKey
 * @returns {Promise<Document>}
 */
const downloadProfilePicture = async (fileKey) => {
  const result = await downloadProfilePic(fileKey);
  return result;
};

const deleteFileFromS3 = async (fileKey) => {
  const result = await deleteDocument(fileKey);
  return result;
};

module.exports = {
  uploadDocument,
  downloadDocument,
  updateDocumentDetails,
  getFilesByOwner,
  uploadProfilePicture,
  downloadProfilePicture,
  getProfilePicByOwner,
  deleteFileFromS3,
};
