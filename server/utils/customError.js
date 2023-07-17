const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: 'error' });

const createError = (status, message) => {
  const err = new Error();
  logger.error(err);
  err.status = status;
  err.message = message;
  return err;
};

module.exports = { createError };
