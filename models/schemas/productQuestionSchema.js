const mongoose = require('mongoose');

const productQuestionSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Question', productQuestionSchema);
