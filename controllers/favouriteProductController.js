const FavouriteProduct = require('../models/favouriteProductModel');
const User = require('../models/userModel');

const Constants = require('../utils/constants/constants');
const Exception = require('../utils/handlers/exception');

const factoryHandler = require('../utils/handlers/factoryHandler');
const asyncHandler = require('../utils/handlers/asyncHandler');

exports.sanitiseFavouriteProductModel = (req, _, next) => {
  if (!req.params.id || !req.user.id) {
    return next(new Exception('Please provide product id and user id', 403));
  }

  req.modelToAdd = {
    productId: req.params.id,
    userId: req.user.id,
  };

  next();
};

exports.getFavouriteProducts = asyncHandler(async (req, res, next) => {
  const products = await FavouriteProduct.find({
    userId: req.user.id,
  }).populate({
    path: 'productId',
    select: 'name price description location createdAt -categories',
  });

  return res.status(200).json({
    success: true,
    results: products.length,
    date: products,
  });
});

exports.addFavouriteProduct = factoryHandler.addOne(FavouriteProduct);

exports.deleteFavouriteProduct = asyncHandler(async (req, res, next) => {
  const { userId, productId } = req.modelToAdd;

  const favouriteProduct = await FavouriteProduct.findOneAndDelete({
    userId,
    productId,
  });

  if (!favouriteProduct) {
    return next(new Exception('No data found', 404));
  }

  return res.status(204).json({
    success: true,
    date: 'Product removed successfully',
  });
});
