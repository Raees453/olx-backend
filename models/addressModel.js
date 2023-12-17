const mongoose = require('mongoose');

const Constants = require('../utils/constants/constants');

const addressScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide address name'],
  },
  state: {
    type: String,
    required: [true, 'Please provide address state'],
  },
  city: {
    type: String,
    required: [true, 'Please provide address city'],
  },
  street: {
    type: String,
    required: [true, 'Please provide address street'],
  },
  building: {
    type: String,
    required: [true, 'Please provide address building'],
  },
  notes: {
    type: String,
    required: [true, 'Please provide address notes'],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = addressScheme;
