const Category = require('../models/categoryModel');

const asyncHandler = require('../utils/handlers/asyncHandler');
const factoryHandler = require('../utils/handlers/factoryHandler');

exports.sanitizeCategoryRequest = (req, next) => {
  const { name, url, subCategories } = req.body;

  req.modelToAdd = { name, url, subCategories };

  next();
};

// should fetch category name, url and sub categories but only their ids
// and not populate them
exports.getCategories = factoryHandler.findMany(Category);

// should return a list of all the sub-categories of the parent category
// all the sub-categories should then be populated accept that their sub
// categories are not needed to be populated
exports.getSubCategories = asyncHandler(async (req, res, next) => {});

// adds a new category to the database and then links it to
// some parent, if not it's the parent
exports.addCategory = factoryHandler.addOne(Category);

// adds only the category to the sub-category of the category
exports.addSubCategory = asyncHandler(async (req, res, next) => {});
