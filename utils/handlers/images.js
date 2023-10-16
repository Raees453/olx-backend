const sharp = require('sharp');

const Exception = require('./exception');
const asyncHandler = require('./asyncHandler');

exports.processProfilePicture = async (file) => {
  if (!file) {
    return next(new Exception('Please add a file as well', 404));
  }

  const buffer = await sharp(file.buffer).resize(200, 200);
  return buffer;
};

const createCircularAvatar = async (inputImagePath, outputImagePath, size) => {
  try {
    const imageBuffer = await sharp(inputImagePath)
      .resize(size, size)
      .toBuffer();

    // Create a circular mask
    const roundedImageBuffer = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    })
      .composite([
        {
          input: Buffer.from([0, 0, 0, 255]), // Circle color (black)
          blend: 'dest-in',
        },
        {
          input: imageBuffer,
          blend: 'over',
        },
      ])
      .png()
      .toBuffer();

    // Save the circular avatar image
    await sharp(roundedImageBuffer).toFile(outputImagePath);

    console.log('Circular avatar created:', outputImagePath);
  } catch (err) {
    console.error('Error creating circular avatar:', err);
  }
};
