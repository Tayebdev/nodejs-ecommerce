const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

exports.resizeImage = (width, height, folderName) =>
  asyncHandler(async (req, res, next) => {
    if (!req.file) {
      return next();
    }

    const filename = `${folderName}-${uuidv4()}-${Date.now()}.png`;

    const fs = require("fs");
    const path = require("path");
    const uploadPath = path.join(__dirname, "..", "Uploads", folderName);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    await sharp(req.file.buffer)
      .resize(width, height)
      .png({ quality: 90 })
      .toFile(
        path.join(uploadPath, filename.replace(/\.[^/.]+$/, "") + ".png")
      );

    req.file.filename = filename;
    req.file.resizedPath = path.join(uploadPath, filename);

    next();
  });
