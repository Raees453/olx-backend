const express = require('express');
const expressRateLimit = require('express-rate-limit');

const locationController = require('../controllers/locationsController');

const router = express.Router();

// TODO apply this to each route
const placesApiLimiter = expressRateLimit({
  windowMs: 60 * 1000 * 60 * 24,
  max: 10,
  message: "You' maxed out of your quota for sending locations request today. ",
});

// router.use(placesApiLimiter);

router.get('/states', locationController.getStatesInCountry);

router.get('/cities', locationController.getCitiesInState);

router.get('/famous', locationController.getFamousLocationsInCity);

router.get('/autocomplete', locationController.getAutoCompletes);

module.exports = router;
