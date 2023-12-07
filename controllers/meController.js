const User = require('../models/userModel');
const Product = require('../models/productModel');

const Constants = require('../utils/constants/constants');
const Exception = require('../utils/handlers/exception');

const asyncHandler = require('../utils/handlers/asyncHandler');

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  console.log(req.queryParams, req.id);

  res.status(200).json({
    status: true,
  });
});

exports.sanitiseUser = (req, res, next) => {
  const { photo, name, bio, dob, phone } = req.body;

  req.modelToAdd = { photo, name, bio, dob, phone };

  next();
};

exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    console.log('Not Logged in!');
    return next(new Exception('Please login to access this feature!', 401));
  }

  const user = await User.findById(id);

  if (!user.active) {
    return next(new Exception('Your account has been disabled!', 401));
  }

  user.sanitise();

  return res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    console.log('Not Logged in!');
    return next(new Exception('Please login to access this feature!', 401));
  }

  const user = await User.findByIdAndUpdate(id, req.modelToAdd, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new Exception('No User found', 404));
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    return next(new Exception('Please login to access this feature!', 401));
  }

  const user = await User.findByIdAndUpdate(id, { active: false });

  console.log('User account ', user.id, 'deleted!');

  return res.status(203).json({
    success: true,
    message: 'Your account has been deactivated!',
  });
});

exports.getMyProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    return next(new Exception('Please login to access this feature!', 401));
  }

  const myProducts = await Product.find({ user: id });

  return res.status(200).json({
    success: true,
    results: myProducts.length,
    data: myProducts,
  });
});
