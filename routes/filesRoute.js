const express = require('express');
const multer = require('multer');

const authController = require('../controllers/authController');
const fileController = require('../controllers/filesController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authController.authorize);
router.use(upload.single('profile'));

router.post('/upload/profile', fileController.uploadProfile);

module.exports = router;
