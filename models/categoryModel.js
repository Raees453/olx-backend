const mongoose = require('mongoose');

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
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      unique: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Category', categorySchema);
