const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(
    categoryController.sanitizeCategoryRequest,
    categoryController.addCategory
  );

router
  .route('./:id')
  .get(categoryController.getSubCategories)
  .post(categoryController.addSubCategory);

module.exports = router;
