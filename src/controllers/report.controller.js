const moment = require('moment');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const reportService = require('../services/report.service');

const getReports = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['status', 'worker']);
  if (req?.query?.startDate && req?.query?.endDate) {
    filter = {
      ...filter,
      ...{
        createdAt: {
          $gte: moment(req.query.startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          $lt: moment(req.query.endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        },
      },
    };
  }

  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'worker, job, job.customer' }; //populate workers
  const result = await reportService.queryReports(filter, options);
  res.send(result);
});

const getDashboardData = catchAsync(async (req, res) => {
  const result = await reportService.getDashboardData();
  res.send(result);
});

const getChartData = catchAsync(async (req, res) => {
  const { workerId } = req.params;
  const result = await reportService.getChartData(workerId);
  res.send(result);
});

module.exports = {
  getReports,
  getDashboardData,
  getChartData,
};
