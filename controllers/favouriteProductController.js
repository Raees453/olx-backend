const FavouriteProduct = require('../models/favouriteProductModel');
const Product = require('../models/productModel');

const Exception = require('../utils/handlers/exception');

const factoryHandler = require('../utils/handlers/factoryHandler');
const asyncHandler = require('../utils/handlers/asyncHandler');

exports.sanitiseFavouriteProductModel = async (req, _, next) => {
  if (!req.params.id || !req.user.id) {
    return next(new Exception('Please provide product id and user id', 403));
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Exception('No Product Found', 404));
  }

  req.modelToAdd = {
    productId: req.params.id,
    userId: req.user.id,
  };

  next();
};

exports.getFavouriteProducts = asyncHandler(async (req, res, next) => {
  const products = await FavouriteProduct.find({ userId: req.user.id })
    .select({ userId: 0, __v: 0, _id: 0 })
    .populate({
      path: 'productId',
    });

  return res.status(200).json({
    success: true,
    results: products?.length ?? 0,
    data: products,
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
