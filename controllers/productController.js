const Product = require('../models/productModel');

const factoryHandler = require('../utils/handlers/factoryHandler');

exports.getProductById = factoryHandler.findOne(Product);
exports.getProducts = factoryHandler.findMany(Product);
exports.addProduct = factoryHandler.addOne(Product);
exports.getCommonQuestions = factoryHandler.addOne(Product);
exports.addCommonQuestions = factoryHandler.addOne(Product);
exports.updateCommonQuestions = factoryHandler.addOne(Product);
exports.deleteCommonQuestions = factoryHandler.addOne(Product);

exports.sanitizeProduct = (req, res, next) => {
  next();
};
