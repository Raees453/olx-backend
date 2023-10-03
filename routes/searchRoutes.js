const express = require('express');

const searchController = require('../controllers/searchesController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.authorize);

router
  .route('/')
  .get(searchController.getSaveSearches)
  .post(searchController.addSearchModel, searchController.saveSearch);

router.route('/:id').delete(searchController.deleteSavedSearch);

module.exports = router;
