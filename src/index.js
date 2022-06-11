const mongoose = require('mongoose');
require('dotenv').config();

// const axios = require('axios');
// const cron = require('node-cron');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

//Main cronjob everyday 12:00 AM
// cron.schedule(config.cronjobs.time, async () => {
//   try {
//     logger.info(`✓ Cron-job started - job update `);
//     await axios.get(`${config.baseUrl}/v1/jobs/cron`);
//     logger.info(`✓ Cron-job finished - job update`);
//   } catch (err) {
//     logger.error(`X ${err.message}`);
//     logger.info(`X Cron-job failed - job update`);
//   }
// });

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  const PORT = process.env.PORT || 8000;
  logger.info('Connected to MongoDB');
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
