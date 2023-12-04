const Product = require('../../models/productModel');

const Exception = require('../../utils/handlers/exception');

const asyncHandler = require('../../utils/handlers/asyncHandler');

const getProductAndQuestionIDs = (req, next) => {
  let { id, questionId } = req.params;

  if (!id || !questionId) {
    id = req.body.id;
    questionId = req.body.questionId;
  }

  if (!id || !questionId) {
    return next(
      new Exception('Please provide product id and question id', 403)
    );
  }

  return { id, questionId };
};

const getQuestionByQuestionId = (questionId) => {
  return Product.findOne(
    {
      'questions._id': questionId,
    },
    { 'questions.$': 1 }
  );
};

exports.addQuestion = asyncHandler(async (req, res, next) => {
  const { question, answer } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $push: { questions: { question, answer } } },
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

exports.getQuestions = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new Exception('No document found.', 404));
  }

  const questions = product.questions;

  return res.status(200).json({
    success: true,
    results: questions.length,
    body: questions,
  });
});

exports.getQuestionById = asyncHandler(async (req, res, next) => {
  const { questionId } = getProductAndQuestionIDs(req, next);

  let question = await getQuestionByQuestionId(questionId);

  if (!question) {
    return next(new Exception('No Question Found!', 404));
  }

  // TODO remove this as this should not be fetched anyways, so not needed
  question.categories = undefined;

  // TODO make this fix as well, means this one is not needed at all
  question = question.questions[0] || undefined;

  return res.status(200).json({
    success: true,
    body: question,
  });
});

// TODO Not working at all
exports.updateQuestionById = asyncHandler(async (req, res, next) => {
  const { id, questionId } = getProductAndQuestionIDs(req, next);

  const question = { question: req.body.question, answer: req.body.answer };

  console.log('Question: ', question, id, questionId);

  const product = await Product.findOneAndUpdate(
    {
      _id: id,
      'questions._id': questionId,
    },
    {
      $set: {
        'questions.$': question,
      },
    },
    { new: true }
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

// TODO Not working at all
exports.deleteQuestionById = asyncHandler(async (req, res, next) => {
  const { id, questionId } = getProductAndQuestionIDs(req, next);

  const product = await Product.findById(id);

  if (!product) {
    return next(new Exception('No Product found with provided id', 404));
  }

  console.log(product.questions);

  product.questions = product.questions.filter(
    (question) => question._id !== questionId
  );

  console.log(product.questions);

  product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    results: product.questions.length,
    data: product.questions,
  });
});
