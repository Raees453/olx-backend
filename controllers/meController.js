const User = require('../models/userModel');
const Product = require('../models/productModel');

const Exception = require('../utils/handlers/exception');

const asyncHandler = require('../utils/handlers/asyncHandler');

exports.changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(
      new Exception(
        'Please provide current and new password and confirm new password'
      )
    );
  }

  if (newPassword != confirmPassword) {
    return next(new Exception('Passwords dont match'));
  }

  const user = await User.findById(req.user.id).select('+password');

  console.log(user.password);

  if (user == null || !user.active) {
    return next(
      new Exception('No User exists or the user has deleted the account')
    );
  }

  const isCorrectPassword = user.comparePassword(currentPassword);

  if (!isCorrectPassword) {
    return next(new Exception('Invalid password provided.'));
  }

  await user.save();

  user.sanitise();

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user == null) {
    return next(new Exception('No User Found', 404));
  }

  user.sanitise();

  const userProducts = await Product.find({
    user: user.id,
  });

  res.status(200).json({
    status: true,
    data: { user, products: userProducts },
  });

  next();
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
