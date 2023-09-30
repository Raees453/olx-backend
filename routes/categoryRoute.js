const express = require('express');

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(
    categoryController.sanitizeCategoryRequest,
    categoryController.addCategory
  );

router
  .route('/:id')
  .get(authController.authorize, categoryController.getSubCategories)
  .post(authController.authorize, categoryController.addSubCategory);

router.route('/:id/sub/:catId').post(categoryController.addSubCategory);

module.exports = router;
