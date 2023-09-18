const express = require('express');

const Exception = require('./utils/handlers/exception');
const Errors = require('./utils/constants/errors');

const app = express();

app.all('*', (req, res, next) =>
  next(new Exception(Errors.NO_ROUTE_FOUND.MESSAGE, Errors.NO_ROUTE_FOUND.CODE))
);

module.exports = app;
