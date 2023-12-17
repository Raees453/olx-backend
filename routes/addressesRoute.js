const express = require('express');

const authController = require('../controllers/authController');
const addressController = require('../controllers/addressController');

const router = express.Router({ mergeParams: true });

router.use(authController.authorize);

router.use(addressController.sanitise);

// TODO only the current user can access these routes, meaning
// I can access only my address and no one else

router
  .route('/')
  .get(addressController.getAddresses)
  .post(addressController.addAddress);

router
  .route('/:id')
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
