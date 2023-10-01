const axios = require('axios');

const Constants = require('../utils/constants/constants');

const asyncHandler = require('../utils/handlers/asyncHandler');

const locationsApiKey = process.env.GOOGLE_MY_PLACES_API_KEY;

const sendPlacesAPIRequest = async (params) => {
  return await axios.get(Constants.apis.PLACES_API_URL, { params });
};

exports.getStatesInCountry = asyncHandler(async (req, res, next) => {
  const { country } = req.params;

  const params = {
    address: country,
    components: 'country:' + country,
    key: locationsApiKey,
  };

  const result = sendPlacesAPIRequest(params);

  console.log(result.data.results);

  return res.status(200).json({
    success: true,
    count: result.data.results.length,
    data: result.data.results,
  });
});

exports.getCitiesInState = asyncHandler(async (req, res, next) => {
  const { country, state } = req.params;

  const params = {
    query: `cities in ${state}, ${country}`,
    key: locationsApiKey,
  };

  const result = sendPlacesAPIRequest(params);

  console.log(result.data.results);

  return res.status(200).json({
    success: true,
    count: result.data.results.length,
    data: result.data.results,
  });
});

exports.getFamousLocationsInCity = asyncHandler(async (req, res, next) => {
  const { country, city } = req.params;

  const params = {
    location: `${city}, ${country}`,
    radius: Constants.MAX_LOCATION_RADIUS,
    key: locationsApiKey,
  };

  const result = sendPlacesAPIRequest(params);

  console.log(result.data.results);

  return res.status(200).json({
    success: true,
    count: result.data.results.length,
    data: result.data.results,
  });
});
