const express = require('express');

const addressRoute = require('./addressesRoute');
const searchRoute = require('../routes/searchRoutes');

const authController = require('../controllers/authController');
const meController = require('../controllers/meController');

const router = express.Router();

// needs to be authorized for profile CURD
router.use(authController.authorize);

router.use('/addresses', addressRoute);
router.use('/searches', searchRoute);

router.route('/profile/:id').get(meController.getUserProfile);

router.route('/products').get(meController.getMyProduct);

router.route('/change-password').post(meController.changePassword);

router.use(meController.sanitiseUser);

router
  .route('/')
  .get(meController.getMyProfile)
  .patch(meController.updateProfile)
  .delete(meController.deleteProfile);

module.exports = router;
