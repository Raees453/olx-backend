const Product = require('../models/productModel');

const factoryHandler = require('../utils/handlers/factoryHandler');

exports.getProductById = factoryHandler.findOne(Product);
exports.getProducts = factoryHandler.findMany(Product);
exports.addProduct = factoryHandler.addOne(Product);
exports.updateProduct = factoryHandler.updateOne(Product);
exports.deleteProduct = factoryHandler.deleteOne(Product);

exports.getCommonQuestions = factoryHandler.addOne(Product);
exports.addCommonQuestions = factoryHandler.addOne(Product);
exports.updateCommonQuestions = factoryHandler.addOne(Product);
exports.deleteCommonQuestions = factoryHandler.addOne(Product);

exports.sanitizeProduct = (req, res, next) => {
  const {
    name,
    description,
    details,
    categories,
    price,
    imageUrls,
    location,
    questions,
    priceUnit,
  } = req.body;

  req.modelToAdd = {
    name,
    description,
    details,
    categories,
    price,
    imageUrls,
    location,
    questions,
    priceUnit,
    updatedAt: Date.now(),
  };

  next();
};
