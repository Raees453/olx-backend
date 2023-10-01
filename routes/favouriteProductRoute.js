const express = require('express');

const authController = require('../controllers/authController');
const favouriteProductController = require('../controllers/favouriteProductController');

const router = express.Router();

router.use(authController.authorize);

router.route('/').get(favouriteProductController.getFavouriteProducts);

// TODO params id is undefined, look out for different but cooler approach
// router.use(favouriteProductController.sanitiseFavouriteProductModel);

router
  .route('/:id')
  .post(
    favouriteProductController.sanitiseFavouriteProductModel,
    favouriteProductController.addFavouriteProduct
  )
  .delete(
    favouriteProductController.sanitiseFavouriteProductModel,
    favouriteProductController.deleteFavouriteProduct
  );

module.exports = router;
