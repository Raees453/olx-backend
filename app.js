const express = require('express');

const Exception = require('./utils/handlers/exception');
const Errors = require('./utils/constants/errors');

const routes = require('./routes');
const globalErrorHandler = require('./utils/handlers/globalExceptionHandler');

const app = express();

// convert response requests to json
app.use(express.json());

// app routes
app.use('/', routes);

app.all('*', (req, res, next) => {
  console.log(req.params);
  next(new Exception(Errors.NO_ROUTE_FOUND.MESSAGE, Errors.NO_ROUTE_FOUND.CODE))
});

app.use(globalErrorHandler);

module.exports = app;
