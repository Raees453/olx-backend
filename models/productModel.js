const mongoose = require('mongoose');

const User = require('../models/userModel');

const Constants = require('../utils/constants/constants');

const productLocationSchema = require('./schemas/positionSchema');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Please choose a different product name'],
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
  condition: {
    type: String,
    enum: ['new', 'used'],
    default: 'new',
  },
  location: {
    type: productLocationSchema,
    required: [true, 'Please provide `location` as well.'],
  },
  imageUrls: {
    type: [String],
    maxlength: [10, 'Image URLs cannot exceed 10.'],
    // TODO, it should have a validator to make all the urls unique
  },
  displayUser: {
    type: Boolean,
    default: true,
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
      required: [true, 'Please provide category or category ids'],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a `user id` as well'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.index({ name: 1 });
productSchema.index({ condition: 1 });
productSchema.index({ location: '2dsphere' });

// TODO not working at all
productSchema.pre(/^findById/, async function (next) {
  console.log('Pre find by id middleware called', this);

  this.obj.updatedAt = Date.now;

  next();
});

productSchema.post('findOne', async function (doc) {
  console.log('Find One POST Middleware Called for Product', doc);

  if (doc.displayUser) {
    // doc._doc.user = await User.findById(doc.user);

    await doc.populate({
      path: Constants.models.users.PATH,
      // select: Constants.models.users.SELECT,
    });
  }

  // next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: Constants.models.products.PATH,
    // select: Constants.models.products.SELECT,
  });

  next();
});

productSchema.post('save', async (product, next) => {
  await product.populate(Constants.models.products.PATH);

  next();
});

module.exports = mongoose.model('Product', productSchema);
