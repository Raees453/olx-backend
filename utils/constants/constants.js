const CONSTANTS = {
  NO_ROUTE_FOUND: 'No route Found',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  routes: {
    CATEGORY_ROUTE: '/api/v1/categories',
    PRODUCT_ROUTE: '/api/v1/products',
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
