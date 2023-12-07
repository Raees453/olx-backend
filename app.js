const express = require('express');
const morgan = require('morgan');

const Exception = require('./utils/handlers/exception');
const Errors = require('./utils/constants/errors');

const routes = require('./routes');
const globalErrorHandler = require('./utils/handlers/globalExceptionHandler');

const app = express();

// convert response requests to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// app routes
app.use('/', routes);

// app.use('/', (_, res, next) => {
//   return res.status(200).json({
//     success: true,
//     message: 'Welcome to OLX App.',
//   });
// });

app.all('*', (req, res, next) => {
  console.log('Invalid route found!', req.url);
  next(new Exception(Errors.NO_ROUTE_FOUND.MESSAGE, 404));
});

app.use(globalErrorHandler);

module.exports = app;
