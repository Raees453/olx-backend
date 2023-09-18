const config = require('config');

const Constants = require('../constants/constants');
const Errors = require('../constants/errors');
const Exception = require('./exception');

const environment = config.environment;

exports.globalErrorHandler = (err, req, res) => {
  err.code = err.code || Errors.SOMETHING_WENT_WRONG.CODE;
  err.message = err.message || Errors.SOMETHING_WENT_WRONG.MESSAGE;

  console.log('Error occurred', err.name);

  if (environment === Constants.DEVELOPMENT) {
    return sendDevelopmentError(err, res);
  }

  return sendProductionError(err, res);
};

const sendDevelopmentError = (err, res) => {
  return res.status(err.code).json({
    success: false,
    name: err.name,
    data: err.message,
    stack: err.stack,
  });
};

const sendProductionError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.code).json({
      success: false,
      data: err.message,
    });
  }

  return res
    .status(Errors.SOMETHING_WENT_WRONG.CODE)
    .json({ success: false, data: Errors.SOMETHING_WENT_WRONG.MESSAGE });
};

const handleUniqueValueError = (err) => new Exception('');
