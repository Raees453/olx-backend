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

exports.uploadImage = asyncHandler(async (req, res, next) => {
  let { file } = req;

  if (!file) {
    return next(new Exception('Please provide a file', 404));
  }

  file = await sharp(file.buffer)
    .jpeg({ quality: 80 })
    .resize(820, 312)
    .toBuffer();

  const filename = `image-${Date.now().toString()}.png`;

  const destinationPath = 'images/' + filename;

  const fileToUpload = bucket.file(destinationPath);

  const fileStream = fileToUpload.createWriteStream({
    metadata: {
      contentType: 'image/jpeg',
      // contentType: file.mimetype,
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

  fileStream.end(Buffer.from(file));
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
