const express = require('express');

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/all').get(categoryController.getAllCategories);
router.route('/popular').get(categoryController.getPopularCategories);

router
  .route('/')
  .get(categoryController.getCategories)
  .post(
    categoryController.sanitizeCategoryRequest,
    categoryController.addCategory
  );

router
  .route('/:id')
  .get(categoryController.getSubCategories)
  .post(authController.authorize, categoryController.addSubCategory);

router
  .route('/:id/sub/:catId')
  .post(authController.authorize, categoryController.addSubCategory);

module.exports = router;
