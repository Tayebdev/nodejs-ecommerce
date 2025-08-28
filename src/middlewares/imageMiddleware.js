const multer = require("multer");
const fs = require("fs");
const ErrorAPI = require("../utils/ErrorAPI");

exports.uploadImage = () => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ErrorAPI("Only image files are allowed", 400), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });
};

exports.removeImage = (filename) => {
  return new Promise((resolve, reject) => {
    if (!filename) {
      return resolve({ message: "Picture not found" });
    }
    fs.unlink(filename, (err) => {
      if (err) {
        return reject({ message: "Error deleting file", error: err });
      } else {
        return resolve({
          message: "File deleted successfully",
          filepath: filename,
        });
      }
    });
  });
};
