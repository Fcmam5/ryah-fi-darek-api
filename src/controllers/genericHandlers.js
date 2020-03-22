const logger = require('../lib/logger')(__filename);

const handle404 = (req, res) =>
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'Page not found',
  });

const handelServerErrors = (err, req, res) => {
  logger.warn(err);
  const { isBoom } = err;
  const statusCode = isBoom ? err.output.statusCode : err.statusCode;
  const { message } = err;

  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

const healthcheck = (req, res) =>
  res.status(200).json({ uptime: Math.ceil(process.uptime()) });

module.exports = {
  handle404,
  handelServerErrors,
  healthcheck,
};
