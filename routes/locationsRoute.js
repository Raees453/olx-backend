const express = require('express');

const locationController = require('../controllers/locationsController');

const router = express.Router();

router.get('/states', locationController.getStatesInCountry);

router.get('/cities', locationController.getCitiesInState);

router.get('/famous', locationController.getFamousLocationsInCity);

module.exports = router;
