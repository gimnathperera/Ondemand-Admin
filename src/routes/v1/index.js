const express = require('express');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const jobRoute = require('./job.route');
const userJobRoute = require('./user.job.route');
const messageRoute = require('./message.route');
const reportRoute = require('./report.route');
const documentRoute = require('./document.route');
const paymentRoute = require('./payment.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/jobs',
    route: jobRoute,
  },
  {
    path: '/user-jobs',
    route: userJobRoute,
  },

  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/report',
    route: reportRoute,
  },
  {
    path: '/documents',
    route: documentRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
