const config = require('config');

const Constants = require('../constants/constants');
const Errors = require('../constants/errors');
const Exception = require('./exception');

const environment = config.environment;

module.exports = globalErrorHandler = (err, req, res, next) => {
  err.code = err.code || err.statusCode || Errors.SOMETHING_WENT_WRONG.CODE;
  err.message = err.message || Errors.SOMETHING_WENT_WRONG.MESSAGE;

  console.log('Global Error Received, Name:', err.name, 'Code:', err.code, err);

  if (environment === Constants.DEVELOPMENT) {
    return sendDevelopmentError(err, res);
  }

  return sendProductionError(err, res);
};

const sendDevelopmentError = (err, res) => {
  return res.status(err.code).json({
    status: false,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

const sendProductionError = (err, res) => {
  let error;
  if (err.name === 'MongoServerError') {
    error = handleUniqueValueError(err);
  }

  if (err.isOperational) {
    return res.status(err.code).json({
      success: false,
      data: error.message,
    });
  }

  return res
    .status(Errors.SOMETHING_WENT_WRONG.CODE)
    .json({ success: false, data: Errors.SOMETHING_WENT_WRONG.MESSAGE });
};

const handleUniqueValueError = (err) =>
  new Exception(`Value: ${err.keyValue.name} already exists`, 403);
