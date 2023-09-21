const express = require('express');

const Constants = require('../utils/constants/constants');

const router = express.Router();

const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');

router.use(Constants.routes.CATEGORY_ROUTE, categoryRoute);
router.use(Constants.routes.PRODUCT_ROUTE, productRoute);

module.exports = router;
