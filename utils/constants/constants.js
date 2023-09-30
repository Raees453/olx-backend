const CONSTANTS = {
  PASSWORD_SALT: 10,
  FROM_EMAIL: 'abc@gmail.com',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  NO_ROUTE_FOUND: 'No route Found',
  PASSWORD_RESET_EXPIRES_IN: 5 * 60 * 1000,
  routes: {
    CATEGORY_ROUTE: '/api/v1/categories',
    PRODUCT_ROUTE: '/api/v1/products',
    AUTH_ROUTE: '/api/v1/auth',
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
  },
};

module.exports = CONSTANTS;
