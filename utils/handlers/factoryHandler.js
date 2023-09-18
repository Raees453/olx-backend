const Exception = require('./exception');

const asyncHandler = require('./asyncHandler');

const sendResponse = (doc, res, next) => {
  if (!doc) {
    return next(new Exception('No document found', 404));
  }

  return res.status(200).json({
    success: true,
    results: doc.length,
    data: doc,
  });
};

const populateQuery = (query, populateOptionsList) => {
  if (populateOptionsList) {
    populateOptionsList.forEach(
      (populateOptions) => (query = query.populate(populateOptions))
    );
  }
  return query;
};

exports.findOne = (Model, populateOptionsList) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const doc = await populateQuery(Model.findById(id), populateOptionsList);

    return sendResponse(doc, res);
  });

exports.findMany = (Model, populateOptionsList) =>
  asyncHandler(async (req, res, next) => {
    const docs = await populateQuery(Model.find(), populateOptionsList);

    return sendResponse(docs, res, next);
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const { modelToUpdate } = req;

    const doc = await Model.findByIdAndUpdate(id, modelToUpdate, { new: true });

    return sendResponse(doc, res, next);
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const { modelToUpdate } = req;

    const doc = await Model.findByIdAndDelete(id, modelToUpdate);

    return sendResponse(doc, res, next);
  });

exports.addOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { modelToAdd } = req;

    if (!modelToAdd) {
      return next(new Exception('Please provide a model to save', 404));
    }

    const doc = await Model.create(modelToAdd);

    return sendResponse(doc, res, next);
  });
