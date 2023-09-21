const express = require('express');

const productQuestionsRouter = require('./questionRoute');
const productController = require('../controllers/productController');

const router = express.Router();

router.use('/:id/questions', productQuestionsRouter);

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.sanitizeProduct, productController.addProduct);

router.route('/:id').get(productController.getProductById);

module.exports = router;
