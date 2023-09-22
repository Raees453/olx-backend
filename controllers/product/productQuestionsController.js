const Product = require('../../models/productModel');

const Exception = require('../../utils/handlers/exception');

const factoryHandler = require('../../utils/handlers/factoryHandler');
const asyncHandler = require('../../utils/handlers/asyncHandler');

// TODO Implement all of them

exports.getQuestions = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Exception('No Product found with provided id', 404));
  }

  return res.status(200).json({
    success: true,
    results: product.questions.length,
    data: product.questions,
  });
});

exports.addQuestion = asyncHandler(async (req, res, next) => {
  const { question, answer } = req.body;

  const modelToAdd = { question, answer };

  console.log('MODEL', modelToAdd);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $push: { questions: modelToAdd } },
    {
      new: true,
    }
  );

  if (!product) {
    return next(new Exception('No Product found with provided id', 404));
  }

  return res.status(200).json({
    success: true,
    results: product.questions.length,
    data: product.questions,
  });
});

exports.getQuestionById = (req, res, next) => {};
exports.updateQuestionById = asyncHandler(async (req, res, next) => {
  const { questionId, id } = req.params;

  const { question, answer } = req.body;

  const modelToAdd = { question, answer };

  const product = await Product.updateOne(
    {
      id,
      questions: questionId,
    },
    { $set: { 'questions.$': modelToAdd } },
    {
      new: true,
    }
  );

  if (!product) {
    return next(new Exception('No Product found with provided id', 404));
  }

  return res.status(200).json({
    success: true,
    results: product.questions.length,
    data: product.questions,
  });
});

exports.deleteQuestionById = (req, res, next) => {};
