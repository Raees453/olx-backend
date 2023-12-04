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
  if (!err.isOperational) {
    err.code = 500;
  }

  return res.status(err.code).json({
    status: false,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

const sendProductionError = (err, res) => {
  console.error('Inside Production Error', err.toString());

  let error = err;

  if (err.code === 11000) {
    error = handleUniqueValueError(err);
  } else if (err.name === 'CastError') {
    error = handleCastError(err);
  } else if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }

  if (error.isOperational) {
    return res.status(error.code).json({
      success: false,
      data: error.message,
    });
  }

  return res.status(Errors.SOMETHING_WENT_WRONG.CODE).json({
    success: false,
    message: Errors.SOMETHING_WENT_WRONG.MESSAGE,
  });
};

const handleUniqueValueError = (err) => {
  let message = '';

  if (err.keyValue.name) {
    message = err.keyValue.name;
  } else if (err.keyValue.email) {
    message = err.keyValue.email;
  } else if (err.keyValue.phone) {
    message = err.keyValue.phone;
  }

  return new Exception(`Value: ${message} already exists`, 409);
};

const handleCastError = (err) =>
  new Exception(`Invalid id ${err.value} provided`, 404);

const handleValidationError = (err) =>
  new Exception(`Invalid data provided!`, 400);
