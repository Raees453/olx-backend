const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: [true, 'Please provide `location point` as well.'],
  },
  coordinates: {
    type: [Number],
    required: [true, 'Please provide `location coordinates` as well'],
  },
});

module.exports = locationSchema;
