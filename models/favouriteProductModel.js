const mongoose = require('mongoose');

const favouriteProductsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide product id.'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user id.'],
  },
});

favouriteProductsSchema.index({ userId: 1 });

// TODO handle an error for duplicate products
favouriteProductsSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('FavouriteProduct', favouriteProductsSchema);
