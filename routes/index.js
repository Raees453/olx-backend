const express = require('express');

const Constants = require('../utils/constants/constants');

const router = express.Router();

const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const authRoute = require('./authRoute');
const locationsRoute = require('./locationsRoute');

router.use(Constants.routes.CATEGORY_ROUTE, categoryRoute);
router.use(Constants.routes.PRODUCT_ROUTE, productRoute);
router.use(Constants.routes.AUTH_ROUTE, authRoute);
router.use(Constants.routes.LOCATION_ROUTE, locationsRoute);

module.exports = router;
