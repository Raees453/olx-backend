const express = require('express');
const multer = require('multer');

const productQuestionsRouter = require('./questionRoute');
const productController = require('../controllers/productController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.use('/:id/questions', productQuestionsRouter);

router
  .route('/')
  .get(productController.getProducts)
  .post(
    productController.sanitizeProduct,
    upload.array('images'),
    productController.addProduct
  );

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.sanitizeProduct, productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('/:id/location').patch(productController.updateProductLocation);

module.exports = router;
