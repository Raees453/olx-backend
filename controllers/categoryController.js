const Category = require('../models/categoryModel');
const Exception = require('../utils/handlers/exception');

const asyncHandler = require('../utils/handlers/asyncHandler');
const factoryHandler = require('../utils/handlers/factoryHandler');

exports.getCategories = factoryHandler.findMany(Category);
exports.getSubCategories = factoryHandler.findOne(Category);

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().populate({ path: 'subCategories' });

  return res.status(200).json({
    success: true,
    data: categories,
  });
});

exports.addCategory = factoryHandler.addOne(Category);

// adds only the category to the sub-category of the category
exports.addSubCategory = asyncHandler(async (req, res, next) => {
  let subCategoryId = req.body.id;
  let subCategoryIds = req.body.ids;

  if (!(subCategoryIds && subCategoryId)) {
    subCategoryId = req.params.catId;
  }

  let options;

  if (subCategoryId) {
    options = {
      $push: { subCategories: subCategoryId },
    };
  } else {
    if (subCategoryIds.length === 0) {
      return next(new Exception('Please provide category-id/s as well', 401));
    }

    options = {
      subCategories: subCategoryIds,
    };
  }

  return factoryHandler.findOneAndUpdate(Category, options)(req, res, next);
});

exports.sanitizeCategoryRequest = (req, res, next) => {
  const { name, url, subCategories } = req.body;

  req.modelToAdd = { name, url, subCategories };

  next();
};
