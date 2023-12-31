const crypto = require('crypto');
const util = require('util');

const jwt = require('jsonwebtoken');

const Exception = require('../utils/handlers/exception');
const User = require('../models/userModel');

const asyncHandler = require('../utils/handlers/asyncHandler');
const emailService = require('../services/email_service');

exports.signUp = asyncHandler(async (req, res, next) => {});

exports.checkForUniquePhoneOrEmail = asyncHandler(async (req, res, next) => {
  const { email, phone } = req.body;

  if (!(email || phone)) {
    return next(new Exception('Please provide email or phone', 404));
  }

  if (email) {
    const user = await User.findOne({
      email: email,
    });

    return res.status(200).json({
      success: true,
      new: user?.email === undefined,
    });
  }

  if (phone) {
    const user = await User.findOne({
      phone: phone,
    });

    return res.status(200).json({
      success: true,
      new: user?.email === undefined,
    });
  }

  return res.status(200).json({
    success: true,
    new: user?.phone === undefined,
  });
});

exports.signUpWithEmail = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  const user = await User.create({
    email,
    password,
    confirmPassword,
  });

  if (!user) {
    return next(new Exception('Some error occurred', 500));
  }

  user.sanitise();

  return res.status(201).json({
    success: true,
    data: user,
  });
});

exports.signUpWithPhone = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.modelToAdd);

  if (!user) {
    return next(new Exception('Some error occurred', 500));
  }

  user.sanitise();

  return res.status(201).json({
    success: true,
    data: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Exception('Please provide email and password', 404));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new Exception('No User found', 404));
  }

  if (user.passwordResetToken && user.passwordResetTokenExpiresIn) {
    return next(new Exception('Please change your password before login', 403));
  }

  const isPasswordValid = user.comparePassword(password);

  if (!isPasswordValid) {
    return next(new Exception('Invalid Credentials Provided', 403));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.sanitise();

  user.token = token;

  const newUse = { ...user._doc, token };

  return res.status(200).json({
    status: true,
    data: newUse,
  });
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new Exception('Please provide `email`.', 404));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new Exception('No user found with the email provided.', 404));
  }

  const token = await user.generateResetPasswordToken();

  // TODO send an email request to provided email
  await emailService.sendEmail(
    'abc@gmail.com',
    'Forget Password',
    `This is your token to reset forgot password\n\n${token}`
  );

  return res.status(200).json({
    success: true,
    data: 'Password reset request sent to your email address',
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  let { passwordResetToken } = req.params;
  const { password, confirmPassword, token } = req.body;

  if (!passwordResetToken) {
    passwordResetToken = token;
  }

  if (!passwordResetToken || !password || !confirmPassword) {
    return next(
      new Exception(
        'Please provide password reset token, password, confirm password',
        404
      )
    );
  }

  const encryptedPasswordResetToken = crypto
    .createHash('sha256')
    .update(passwordResetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: encryptedPasswordResetToken,
  });

  if (!user) {
    return next(new Exception('No user found for token', 404));
  }

  await user.updatePassword(password, confirmPassword);

  return res.status(200).json({
    success: true,
    message: 'Password Reset Successfully',
  });
});

const verifyAuthToken = (token, secret) =>
  util.promisify(jwt.verify)(token, secret);

// the above written code is simply the longer version of this one
// const verifyAuthToken = util.promisify(jwt.verify);

exports.authorize = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Exception('Please login to access this route', 401));
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (token === 'null') {
    return next(new Exception('You are not logged in', 403));
  }

  const userDetails = await verifyAuthToken(token, secret);

  if (!userDetails) {
    return next(new Exception('Nice try kid. Fuck off!', 401));
  }

  const user = await User.findById(userDetails.id).select('active');

  if (!user) {
    return next(new Exception('Nice try kid. Fuck off!', 401));
  }

  const result = user.checkIfPasswordChangedAfterTokenIssued(userDetails.iat);

  if (!result) {
    return next(
      new Exception('Your password was changed, please login again.', 401)
    );
  }

  if (!user.active) {
    return next(new Exception('Your account is already been deleted!', 403));
  }

  req.user = user;

  next();
});

// TODO implement the feature
exports.signOut = asyncHandler(async (req, res, next) => {});

// TODO make it work after the user log in / profile flow has been completed
exports.updatePassword = asyncHandler(async (req, res, next) => {});

exports.loginWithGoogle = asyncHandler(async (req, res, next) => {});

exports.loginWithFacebook = asyncHandler(async (req, res, next) => {});

exports.loginWithPhone = asyncHandler(async (req, res, next) => {});

exports.sanitise = (req, res, next) => {
  const {
    email,
    phone,
    password,
    confirmPassword,
    name,
    bio,
    gender,
    dob,
    photo,
  } = req.body;

  req.modelToAdd = {
    email,
    phone,
    password,
    confirmPassword,
    name,
    bio,
    gender,
    dob,
    photo,
  };

  next();
};
