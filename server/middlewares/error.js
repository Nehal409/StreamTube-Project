const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: 'errors' });

const errorMiddleware = (err, req, res, next) => {
  logger.error(err);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = errorMiddleware;
