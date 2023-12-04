const express = require('express');
const multer = require('multer');

const productQuestionsRouter = require('./questionRoute');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
