const User = require('../models/userModel');
const Product = require('../models/productModel');

const Exception = require('../utils/handlers/exception');

const asyncHandler = require('../utils/handlers/asyncHandler');
const { add } = require('nodemon/lib/rules');

exports.getAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user.addresses,
  });
});

exports.addAddress = asyncHandler(async (req, res, next) => {
  const { name, state, street, building, notes } = req.modelToAdd;

  if (!name || !street || !state || !building || !notes) {
    return next(new Exception('Please provide all fields', 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { addresses: req.modelToAdd } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: user.addresses,
  });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      addresses: { _id: id },
    },
  });

  const address = user.addresses.find(
    (address) => address._id.toString() === id
  );

  if (!address) {
    return next(new Exception('No Address Found', 404));
  }

  res.status(204).json({
    success: true,
  });
});

exports.updateAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(req.user.id, {
    $set: { 'addresses._id': id },
  });

  const addresses = user.addresses;

  // console.log(user.addresses, '\n', user.toString());

  const address = await addresses.find((address) => address._id === id);

  await address.save();

  console.log('ADDRESS:', address);

  return res.status(200).json({
    success: true,
    data: address,
  });
});

exports.sanitise = (req, res, next) => {
  const { name, state, street, building, notes, isDefault, city } = req.body;

  req.modelToAdd = { name, state, street, building, notes, isDefault, city };

  next();
};
