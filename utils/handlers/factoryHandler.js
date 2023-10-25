const Exception = require('./exception');
const ObjectsFilter = require('../objects_filter');

const asyncHandler = require('./asyncHandler');

const sendResponse = (docs, res, next, message) => {
  if (!docs) {
    return next(new Exception('No document found', 404));
  }

  return res.status(200).json({
    success: true,
    results: docs.length,
    data: message ? 'Document deleted successfully' : docs,
  });
};

const populateQuery = (query, populateOptionsList) => {
  if (populateOptionsList && populateOptionsList.length > 0) {
    populateOptionsList.forEach(
      (populateOptions) => (query = query.populate(populateOptions))
    );
  }
  return query;
};

exports.findOne = (Model, select, ...populateOptionsList) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const doc = await populateQuery(
      Model.findById(id, select),
      populateOptionsList
    );

    return sendResponse(doc, res, next);
  });

exports.findOneAndUpdate = (Model, updateOptions, ...populateOptionsList) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    updateOptions.new = true;
    const doc = await populateQuery(
      Model.findByIdAndUpdate(id, updateOptions),
      populateOptionsList
    );

    return sendResponse(doc, res, next);
  });

exports.findMany = (Model, ...populateOptionsList) =>
  asyncHandler(async (req, res, next) => {
    const filteredQuery = new ObjectsFilter(Model, req.query)
      .filter()
      .sort()
      // .paginate()
      .selectFields()
      .filterByLocationRadius();

    const docs = await filteredQuery.query;

    return sendResponse(docs, res, next);
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const { modelToAdd } = req;

    const doc = await Model.findByIdAndUpdate(id, modelToAdd, { new: true });

    return sendResponse(doc, res, next);
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);

    return sendResponse(doc, res, next, 'Document deleted successfully.');
  });

exports.addOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { modelToAdd } = req;

    if (!modelToAdd) {
      return next(new Exception('Please provide a model to save', 404));
    }

    console.log(modelToAdd);
    const doc = await Model.create(modelToAdd);

    return sendResponse(doc, res, next);
  });
