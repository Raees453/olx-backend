const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const sharp = require('sharp');

const Exception = require('..//utils/handlers/exception');
const asyncHandler = require('../utils/handlers/asyncHandler');
const imageHandler = require('../utils/handlers/images');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

const resizeImage = async (file, filename, width = 200, height = 200) => {
  return sharp(file.buffer).resize(width, height).toFile(filename);
};

exports.uploadProfile = asyncHandler(async (req, res, next) => {
  let { file } = req;

  if (!file) {
    return next(new Exception('Please provide a file', 404));
  }

  const filename = `profile-${req.user.id}.png`;

  const destinationPath = 'profiles/' + filename;

  // file = await resizeImage(file, filename);

  // console.log(file);

  const fileToUpload = bucket.file(destinationPath);

  const fileStream = fileToUpload.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  fileStream.on('error', (err) => {
    console.error('Error uploading file:', err);
    return res.status(500).json({
      success: false,
    });
  });

  fileStream.on('finish', async () => {
    const expires = Date.now() + 60 * 60 * 1000;
    const result = await fileToUpload.getSignedUrl({ action: 'read', expires });

    return res.status(200).json({
      status: true,
      file: result,
    });
  });

  fileStream.end(file.buffer);
});

exports.uploadAdImage = asyncHandler(async (req, res, next) => {});
