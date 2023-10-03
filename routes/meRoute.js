const express = require('express');

const authController = require('../controllers/authController');
const meController = require('../controllers/meController');

const searchRoute = require('../routes/searchRoutes');
const router = express.Router();

// needs to be authorized for profile CURD
router.use(authController.authorize);

router.use('/searches', searchRoute);

router.route('/products').get(meController.getMyProduct);

router.route('/').get(meController.getMyProfile);

router.use(meController.sanitiseUser);

router
  .route('/')
  .patch(meController.updateProfile)
  .delete(meController.deleteProfile);

module.exports = router;
