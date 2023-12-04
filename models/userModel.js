const crypto = require('crypto');

const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const config = require('config');
const validator = require('validator');

const Constants = require('../utils/constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 30,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
    minLength: [20, 'Bio must have a minimum length of 20 characters'],
  },
  slug: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    lowercase: true,
  },
  dob: {
    type: Date,
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
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
  isEmailVerified: { type: Boolean },
  isPhoneVerified: { type: Boolean },
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

  if (this.name) this.slug = slugify(this.name);

  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(this.password, password);
};

userSchema.methods.sanitise = function () {
  this.password = undefined;
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

  this.passwordChangedAt = Date.now();

  await this.save();
};

userSchema.methods.checkIfPasswordChangedAfterTokenIssued = function (
  passwordIssuedTimestamp
) {
  // a user will not have any of these if the user has signed for
  // forget or reset password
  // meaning a user should not be authorized if the user has signed for
  // resetting the password
  if (this.passwordResetToken || this.passwordResetTokenExpiresIn) {
    return false;
  }

  // no password changed at property means that no need to check
  // or compare for JWT issuance
  if (!this.passwordChangedAt) {
    return true;
  }

  // TODO Learn about how to work with dates in JS
  const passwordChangedAtTimestamp = this.passwordChangedAt.getTime() / 1000;

  // password issued at should always be greater than the timestamp
  // at which JWT was created
  return passwordChangedAtTimestamp > passwordIssuedTimestamp;
};

module.exports = mongoose.model('User', userSchema);
