const mongoose = require('mongoose');
const QUERY_STRINGS_TO_EXCLUDE = [
  'sort',
  'page',
  'limit',
  'fields',
  'category',
];

const DEFAULT_SORTING_CRITERIA = '-createdAt';
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_LIMIT = 20;

const DEFAULT_SEARCH_RADIUS = 10000;

class ObjectsFilter {
  constructor(Model, queryString) {
    this.Model = Model;
    this.query = this.Model.find();
    this.queryString = queryString;
  }

  // method would convert query string to suit mongoose
  // e.g. if price[lte] = 100 & price[gte] = 300 is applied
  // the object received would be like
  // price: {       =>  price: {
  //    gte: 300,     =>    $gte: 300,
  //    lte: 100,     =>    $lte: 100,
  // }              =>  }
  // the object should be converted to $gte and $lte to make
  // mongoose understand it and work on it to fetch only for
  // the mentioned filter
  filter = function () {
    const filterObjects = { ...this.queryString };

    QUERY_STRINGS_TO_EXCLUDE.forEach((key) => delete filterObjects[key]);

    const queryStr = JSON.stringify(filterObjects).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  };

  sort = function () {
    const { sort } = this.queryString;

    // e.g. if sort=price,range is provided
    // it will convert this into sort=price range
    const sortingQueryString =
      sort?.replaceAll(',', ' ') ?? DEFAULT_SORTING_CRITERIA;

    this.query = this.query.sort(sortingQueryString);

    return this;
  };

  paginate = function () {
    let { page, limit } = this.queryString;

    if (!page) {
      page = DEFAULT_PAGE_NUM;
    }

    if (!limit) {
      limit = DEFAULT_PAGE_LIMIT;
    }

    const recordsToSkip = (page - 1) * limit;

    this.query = this.query.skip(recordsToSkip).limit(limit);

    return this;
  };

  selectFields = function () {
    const { fields } = this.queryString;

    const selectedFieldsQuery = fields?.replaceAll(',', ' ') ?? '';

    this.query = this.query.select(selectedFieldsQuery);

    return this;
  };

  // accepts only miles and km as radius unit
  filterByLocationRadius = function () {
    const { radius, radiusUnit } = this.queryString;

    if (!radius) {
      return this;
    }

    const maxDistance = ObjectsFilter.convertRadiusToMeters(radius, radiusUnit);
    console.log('Radius', maxDistance, 'meters.');

    this.query = this.query.near('location', {
      center: {
        type: 'Point',
        // TODO Change these to user's coordinates
        coordinates: [31.5204, 74.3587],
      },
      maxDistance: maxDistance,
      spherical: true,
    });

    return this;
  };

  filterByCategoryID = function () {
    const { category } = this.queryString;

    if (!category) {
      return this;
    }

    this.query = this.query.find({
      categories: {
        $elemMatch: { $eq: new mongoose.Types.ObjectId(category) },
      },
    });

    return this;
  };

  static convertRadiusToMeters = (radius, radiusUnit) => {
    let calculatedRadius = radius * 1000;

    if (radiusUnit === 'miles') {
      calculatedRadius *= 0.60934;
    }

    return calculatedRadius || DEFAULT_SEARCH_RADIUS;
  };
}

module.exports = ObjectsFilter;
