const Search = require('../models/searchModel');

const factoryController = require('../utils/handlers/factoryHandler');

exports.addSearchModel = (req, res, next) => {
  const { title, filters, user } = req.body;

  req.modelToAdd = { title, filters, user };

  next();
};

exports.getSaveSearches = factoryController.findMany(Search);
exports.saveSearch = factoryController.addOne(Search);
exports.deleteSavedSearch = factoryController.deleteOne(Search);
