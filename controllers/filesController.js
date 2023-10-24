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

  const id = req.user?.id || '651746ec08a1b7cf9b481515';

  const filename = `profile-${id}.png`;

  const destinationPath = 'profiles/' + filename;

  // TODO resizing the image not working
  // file = await resizeImage(file, filename);

  const fileToUpload = bucket.file(destinationPath);

  const fileStream = fileToUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  fileStream.on('error', (err) => {
    console.error('Error uploading file:', err);
    return res.status(500).json({
      success: false,
    });
  });

  fileStream.on('finish', async () => {
    const expires = Date.now() + 60 * 60 * 1000 * 24 * 30 * 12 * 50;

    const result = await fileToUpload.getSignedUrl({ action: 'read', expires });

    return res.status(200).json({
      status: true,
      url: result[0],
    });
  });

  fileStream.end(file.buffer);
});

exports.uploadAdImage = asyncHandler(async (req, res, next) => {});

exports.uploadFiles = asyncHandler(async (req, res, next) => {
  let { files } = req;

  if (!files) {
    return next(new Exception('Please provide a file', 404));
  }

  const urls = [];

  files.forEach((file) => {
    const filename = `category-${file.filename}.png`;

    const destinationPath = 'categories/' + filename;

    // TODO resizing the image not working
    // file = await resizeImage(file, filename);

    const fileToUpload = bucket.file(destinationPath);

    const fileStream = fileToUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    fileStream.on('error', (err) => {
      console.error('Error uploading file:', err);
      return res.status(500).json({
        success: false,
      });
    });

    fileStream.on('finish', async () => {
      const expires = Date.now() + 60 * 60 * 1000 * 24 * 30 * 12 * 50;

      const result = await fileToUpload.getSignedUrl({
        action: 'read',
        expires,
      });

      urls.push(result[0]);

      if (urls.length === files.length) {
        console.log(urls);

        return res.status(200).json({
          status: true,
          url: urls,
        });
      }
    });

    fileStream.end(file.buffer);
  });
});
