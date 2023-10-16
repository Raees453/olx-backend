const express = require('express');

const Constants = require('../utils/constants/constants');

const router = express.Router();

const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const authRoute = require('./authRoute');
const locationsRoute = require('./locationsRoute');
const meRoute = require('./meRoute');
const favouriteProductRoute = require('./favouriteProductRoute');
const filesRoute = require('./filesRoute');

router.use(Constants.routes.CATEGORY_ROUTE, categoryRoute);
router.use(Constants.routes.PRODUCT_ROUTE, productRoute);
router.use(Constants.routes.AUTH_ROUTE, authRoute);
router.use(Constants.routes.LOCATION_ROUTE, locationsRoute);
router.use(Constants.routes.ME_ROUTE, meRoute);
router.use(Constants.routes.ME_PRODUCTS_ROUTE, favouriteProductRoute);
router.use(Constants.routes.FILES_ROUTE, filesRoute);

module.exports = router;
