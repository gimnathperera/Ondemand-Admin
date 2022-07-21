const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const config = require('../config/config');

const bucketNames = { storageBucket: config.aws.buckets.storageBucket, appDataBucket: config.aws.buckets.appDataBucket };
const region = config.aws.region;
const accessKeyId = config.aws.accessKey;
const secretAccessKey = config.aws.secretAccessKey;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
//have to make sure s3 bucket more organized and reusable

// Upload a file to s3
const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketNames.storageBucket,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

// Download a file from s3
const downloadFile = async (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketNames.storageBucket,
  };

  return s3.getObject(downloadParams).createReadStream();
};

// Upload a profile pic to s3
const uploadProfilePic = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketNames.appDataBucket,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

// Download a profile pic from s3
const downloadProfilePic = async (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketNames.appDataBucket,
  };

  return s3.getObject(downloadParams).createReadStream();
};

// Upload Payslip
const uploadPaySlip = async (filePath, paySlipName) => {
  const fileStream = fs.readFileSync(filePath);

  const uploadParams = {
    Bucket: bucketNames.storageBucket,
    Body: fileStream,
    Key: paySlipName,
  };

  return s3.upload(uploadParams).promise();
};

// Delete a file
const deleteDocument = async (fileKey) => {
  const deleteParams = {
    Bucket: bucketNames.storageBucket,
    Key: fileKey,
  };

  return s3.deleteObject(deleteParams).promise();
};

module.exports = {
  uploadFile,
  downloadFile,
  uploadProfilePic,
  downloadProfilePic,
  uploadPaySlip,
  deleteDocument,
};

// Download a file from s3
