const express = require('express');

const productQuestionsController = require('../controllers/product/productQuestionsController');

const router = express.Router({ mergeParams: true });
// TODO should be authorized and authenticated to do it only

router
  .route('/')
  .get(productQuestionsController.getQuestions)
  .post(productQuestionsController.addQuestion);

router
  .route('/:questionId')
  .get(productQuestionsController.getQuestionById)
  .patch(productQuestionsController.updateQuestionById)
  .delete(productQuestionsController.deleteQuestionById);

module.exports = router;
