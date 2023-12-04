const CONSTANTS = {
  PASSWORD_SALT: 10,
  FROM_EMAIL: 'abc@gmail.com',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  NO_ROUTE_FOUND: 'No route Found',
  PASSWORD_RESET_EXPIRES_IN: 5 * 60 * 1000,
  MAX_LOCATION_RADIUS: 10000,
  apis: {
    // PLACES_API_URL: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    PLACES_API_URL: 'https://maps.googleapis.com/maps/api/geocode/json',
    AUTOCOMPLETE_API_URL:
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  },
  routes: {
    CATEGORY_ROUTE: '/api/v1/categories',
    PRODUCT_ROUTE: '/api/v1/products',
    AUTH_ROUTE: '/api/v1/auth',
    LOCATION_ROUTE: '/api/v1/locations',
    ME_ROUTE: '' + '/api/v1/me',
    ME_PRODUCTS_ROUTE: '' + '/api/v1/me/favourites',
    MY_PRODUCTS_ROUTE: '' + '/api/v1/me/products',
    FILES_ROUTE: '' + '/api/v1/files',
  },
  models: {
    categories: {
      PATH: 'subCategories',
      SELECT: 'name subCategories',
    },
    products: {
      PATH: 'categories',
      SELECT: 'name subCategories',
    },
    users: {
      PATH: 'user',
      SELECT: 'name email phone',
    },
  },
};

module.exports = CONSTANTS;
