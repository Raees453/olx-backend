const Product = require('../models/productModel');

const asyncHandler = require('../utils/handlers/asyncHandler');
const factoryHandler = require('../utils/handlers/factoryHandler');
const Exception = require('../utils/handlers/exception');
const ObjectsFilter = require('../utils/objects_filter');

exports.getProductById = factoryHandler.findOne(Product);
// exports.getProducts = factoryHandler.findMany(Product);
exports.addProduct = factoryHandler.addOne(Product);
exports.updateProduct = factoryHandler.updateOne(Product);
exports.deleteProduct = factoryHandler.deleteOne(Product);

exports.getCommonQuestions = factoryHandler.addOne(Product);
exports.addCommonQuestions = factoryHandler.addOne(Product);
exports.updateCommonQuestions = factoryHandler.addOne(Product);
exports.deleteCommonQuestions = factoryHandler.addOne(Product);

exports.getProducts = asyncHandler(async (req, res, next) => {
  const results = await Product.aggregate([
    {
      $group: {
        _id: null,
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },
  ]);

  const filteredQuery = new ObjectsFilter(Product, req.query)
    .filter()
    .sort()
    .paginate()
    .selectFields()
    .filterByLocationRadius()
    .filterByCategoryID();

  const docs = await filteredQuery.query;

  const maxPrice = results[0]?.maxPrice ?? 0;
  const minPrice = results[0]?.minPrice ?? 0;

  return res.status(200).json({
    success: true,
    maxPrice,
    minPrice,
    results: docs.length,
    data: docs,
  });
});

// TODO complete this route after user sign in feature implemented
exports.addFavouriteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
});

exports.updateProductLocation = asyncHandler(async (req, res, next) => {
  let id = req.params.id;

  if (!id) {
    id = req.body.id;
  }

  const longitude = req.body.longitude;
  const latitude = req.body.latitude;

  if (!id || !longitude || !latitude) {
    return next(
      new Exception(
        'Please provide product id and longitude and latitude.',
        403
      )
    );
  }

  const product = await Product.findByIdAndUpdate(
    { _id: id },
    {
      location: { type: 'Point', coordinates: [longitude, latitude] },
    },
    { new: true }
  );

  return res.status(200).json({ success: true, data: product });
});

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
