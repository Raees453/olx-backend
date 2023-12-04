const express = require('express');
const multer = require('multer');

const authController = require('../controllers/authController');
const fileController = require('../controllers/filesController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.use(authController.authorize);
// router.use();

router.post('/upload', upload.single('file'), fileController.uploadImage);

// router.post("/upload", upload.array("files", 10), fileController.uploadFiles);

module.exports = router;
