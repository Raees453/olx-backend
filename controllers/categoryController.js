const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const Exception = require('../utils/handlers/exception');

const asyncHandler = require('../utils/handlers/asyncHandler');
const factoryHandler = require('../utils/handlers/factoryHandler');

exports.getCategories = factoryHandler.findMany(Category);
exports.getSubCategories = factoryHandler.findOne(Category);

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ image: { $ne: null } })
    .populate({
      path: 'subCategories',
      populate: {
        path: 'subCategories',
        populate: {
          path: 'subCategories',
          populate: {
            path: 'subCategories',
          },
        },
      },
    })
    .exec();

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

exports.getPopularCategories = asyncHandler(async (req, res, next) => {
  const limit = 5;
  const productsLimit = 50;

  const categories = await Category.find().sort({ count: -1 }).limit(limit);

  const popularCategoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await Product.find({
        categories: category._id,
      }).limit(productsLimit);

      return { category, products };
    })
  );

  res.status(200).json({
    success: true,
    results: popularCategoriesWithProducts.length,
    data: popularCategoriesWithProducts,
  });
});

exports.sanitizeCategoryRequest = (req, res, next) => {
  const { name, url, subCategories } = req.body;

  req.modelToAdd = { name, url, subCategories };

  next();
};
