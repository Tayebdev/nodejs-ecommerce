const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");


exports.resizeImageOne = (width, height, folderName) =>
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
exports.resizeImageMany = (width, height, folderName) =>
  asyncHandler(async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const uploadPath = path.join(__dirname, "..", "Uploads", folderName);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Process each file
    await Promise.all(
      req.files.map(async (file, index) => {
        const filename = `${folderName}-${uuidv4()}-${Date.now()}.png`;
        await sharp(file.buffer)
          .resize(width, height,{ fit: "contain"})
          .png({ quality: 90 })
          .toFile(path.join(uploadPath, filename));
        // Save filename in file object for controller
        file.filename = filename;
        file.resizedPath = path.join(uploadPath, filename);
      })
    );

    next();
  });

