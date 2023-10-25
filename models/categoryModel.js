const mongoose = require('mongoose');

const Constants = require('../utils/constants/constants');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a category id'],
  },
  image: {
    type: String,
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      // unique: true,
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

categorySchema.index({ _id: 1, 'subCategories._id': 1 }, { unique: true });

categorySchema.pre(/^findOne/, function (next) {
  this.populate({
    path: Constants.models.categories.PATH,
    select: Constants.models.categories.SELECT,
  });

  next();
});

categorySchema.post(/^findOne/, function (category) {
  category.count++;
  category.save();
});

module.exports = mongoose.model('Category', categorySchema);
