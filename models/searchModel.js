const mongoose = require('mongoose');

const searchModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide search title'],
    unique: [true, 'Please provide a different title'],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user id'],
  },
  filters: {
    type: [String],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Search', searchModelSchema);
