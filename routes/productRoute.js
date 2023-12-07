const express = require('express');

const productQuestionsRouter = require('./questionRoute');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/:id/questions', productQuestionsRouter);

router
  .route('/')
  .get(productController.getProducts)
  .post(
    authController.authorize,
    productController.sanitizeProduct,
    productController.addProduct
  );

router.route('/related/:id').get(productController.getRelatedProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(
    authController.authorize,
    productController.sanitizeProduct,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

router.route('/:id/location').patch(productController.updateProductLocation);

module.exports = router;
