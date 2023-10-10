const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/unique', authController.checkForUniquePhoneOrEmail);

router.post('/signup', authController.signUpWithEmail);

router.get('/login', authController.login);

router.post('/forget-password', authController.forgetPassword);

router.post(
  '/reset-password/:passwordResetToken',
  authController.resetPassword
);

module.exports = router;
