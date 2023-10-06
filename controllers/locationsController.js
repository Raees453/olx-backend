const axios = require('axios');

const { State, City } = require('country-state-city');

const Constants = require('../utils/constants/constants');
const Exception = require('../utils/handlers/exception');

const asyncHandler = require('../utils/handlers/asyncHandler');

const locationsApiKey = process.env.GOOGLE_MY_PLACES_API_KEY;

exports.getStatesInCountry = asyncHandler(async (req, res, next) => {
  let { code } = req.query;

  const states = State.getStatesOfCountry(code);

  return res.status(200).json({
    success: true,
    count: states.length,
    data: states,
  });
});

exports.getCitiesInState = asyncHandler(async (req, res, next) => {
  const { countryCode, stateCode } = req.query;

  if (!countryCode || !stateCode) {
    return next(new Exception('Please provide country & state code', 404));
  }

  const cities = City.getCitiesOfState(countryCode, stateCode);

  return res.status(200).json({
    success: true,
    count: cities.length,
    data: cities,
  });
});

exports.getFamousLocationsInCity = asyncHandler(async (req, res, next) => {
  const { city } = req.params;

  const lat = 31.5204;
  const lng = 74.3587;

  const apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = {
    location: `${lat}, ${lng}`,
    radius: Constants.MAX_LOCATION_RADIUS,
    key: locationsApiKey,
  };

  // TODO decide if want to fetch multiple places or just stick with pagination thing
  const response = await axios.get(apiUrl, { params });

  const { results, next_page_token } = response.data;

  const places = results?.map((place) => {
    return {
      id: place.place_id,
      name: place.name,
    };
  });

  return res.status(200).json({
    success: true,
    count: places.length,
    nextPage: next_page_token,
    data: places,
  });
});

exports.getAutoCompletes = asyncHandler(async (req, res, next) => {
  let { name, lat, lng } = req.query;

  if (!name || !lat || !lng) {
    ({ name, lat, lng } = req.body);
  }

  if (!name || !lat || !lng) {
    return next(
      new Exception('Please provide a location name, lat and lng', 404)
    );
  }

  // TODO research on types and handle it
  const params = {
    input: name,
    key: locationsApiKey, // types: 'establishment',
    location: `${lat}, ${lng}`,
    radius: `${Constants.MAX_LOCATION_RADIUS}`,
  };

  const response = await axios.get(Constants.apis.AUTOCOMPLETE_API_URL, {
    params,
  });

  const { predictions } = response.data;

  const locations = predictions.map((place) => {
    return {
      id: place.place_id,
      description: place.description,
    };
  });

  return res.status(200).json({
    success: true,
    results: locations?.length,
    data: locations,
  });
});
