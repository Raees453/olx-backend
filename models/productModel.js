const mongoose = require('mongoose');

const Constants = require('../utils/constants/constants');

const productLocationSchema = require('./schemas/positionSchema');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide `name` as well.'],
  },
  price: {
    type: Number,
    min: 200,
    max: 5000000,
    required: [true, 'Please provide `price` as well.'],
  },
  priceUnit: {
    type: String,
    enum: ['PKR', 'USD', 'GBP', 'Yun'],
    default: 'PKR',
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: [true, 'Please provide `description` as well.'],
  },
  location: {
    type: productLocationSchema,
    required: [true, 'Please provide `location` as well.'],
  },
  imageUrls: {
    type: [String],
  },
  details: [
    {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  ],
  // TODO Refactor to productQuestionSchema.js file
  questions: [
    {
      question: {
        type: String,
        minLength: 30,
        maxLength: 100,
      },
      answer: {
        type: String,
        minLength: 30,
        maxLength: 300,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  hidden: {
    type: Boolean,
    deletedAt: {
      type: Date,
      default: Date.now,
    },
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      require: [true, 'Please provide category or category ids'],
    },
  ],
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, 'Please provide a `user id` as well'],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.index({ location: '2dsphere' });

// TODO not working at all
productSchema.pre(/^findById/, function (next) {
  console.log('Pre find by id middleware called', this);

  this.obj.updatedAt = Date.now;

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: Constants.models.products.PATH,
    select: Constants.models.products.SELECT,
  });

  next();
});

module.exports = mongoose.model('Product', productSchema);
