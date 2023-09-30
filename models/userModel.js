const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('config');
const validator = require('validator');

const Constants = require('../utils/constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists.'],
    required: [true, 'Please provide `email`.'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  password: {
    type: String,
    select: false,
    minLength: 8,
    required: [true, 'Please provide `password`.'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please provide `confirmPassword`.'],
    select: false,
    validate: {
      validator: function (confirmPassword) {
        return this.password === confirmPassword;
      },
      message: 'Password & Confirm Password do not match.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    select: false,
  },
  photo: String,
  loggedInAt: {
    type: Date,
    // select: false,
  },
  passwordChangedAt: {
    type: Date,
    // select: false,
  },
  passwordExpiresAt: {
    type: Date,
    // select: false,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiresIn: {
    type: Date,
  },
});

userSchema.pre('findOne', async function (next) {
  this.loggedInAt = Date.now();
  this.updatedAt = Date.now();

  next();
});

userSchema.pre('save', async function (next) {
  this.confirmPassword = undefined;
  this.updatedAt = Date.now();

  // TODO Learn about the thing
  if (!this.isModified('password')) {
    return next();
  }

  if (config.environment === 'development') {
    return next();
  }

  this.password = await bcrypt.hash(this.password, Constants.PASSWORD_SALT);

  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(this.password, password);
};

userSchema.methods.generateResetPasswordToken = async function () {
  console.log('Generate Password Reset Token Called for', this.id);

  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  this.passwordResetTokenExpiresIn =
    Date.now() + Constants.PASSWORD_RESET_EXPIRES_IN;

  console.log(this.passwordResetToken);
  console.log(this.passwordResetTokenExpiresIn);

  await this.save();

  return token;
};

userSchema.methods.updatePassword = async function (password, confirmPassword) {
  console.log('Generate Password Reset Token Called for ', this.id);

  this.passwordResetToken = undefined;
  this.passwordResetTokenExpiresIn = undefined;

  this.password = password;
  this.confirmPassword = confirmPassword;

  await this.save();
};

userSchema.methods.checkIfPasswordChangedAfterTokenIssued = async function (
  passwordIssuedTimestamp
) {
  if (this.passwordResetTokenExpiresIn === undefined) {
    return false;
  }

  // TODO Learn about how to work with dates in JS
  const passwordChangedAtTimestamp = this.passwordChangedAt.getTime() / 1000;

  return passwordChangedAtTimestamp > passwordIssuedTimestamp;
};

module.exports = mongoose.model('User', userSchema);
