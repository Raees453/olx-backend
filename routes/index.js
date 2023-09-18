const express = require('express');

const Constants = require('../utils/constants/constants');

const router = express.Router();

const categoryRoute = require('./categoryRoute');

router.use(Constants.routes.CATEGORY_ROUTE, categoryRoute);

module.exports = router;
