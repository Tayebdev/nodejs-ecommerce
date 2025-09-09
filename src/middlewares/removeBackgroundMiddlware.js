// require("dotenv").config();
// const cloudinary = require("cloudinary").v2;


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.removeBackground = () => async (req, res, next) => {
//   if (!req.files || !req.files.length) {
//     return next();
//   }

//   await Promise.all(
//     req.files.map(async (file) => {
//       const result = await cloudinary.uploader.upload(
//         `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//         { resource_type: "image", background_removal: "cloudinary_ai" }
//       );

//       file.cloudinary = {
//         public_id: result.public_id,
//         url: result.secure_url,
//       };
//     })
//   );

//   next();
// };

const axios = require("axios");
require("dotenv").config();
const ErrorAPI = require("../utils/ErrorAPI"); // make sure this path is correct

exports.removeBgFromImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new ErrorAPI("No images uploaded", 400));
    }

    const processedImages = await Promise.all(
      req.files.map(async (file) => {
        const response = await axios({
          method: "post",
          url: "https://api.remove.bg/v1.0/removebg",
          data: {
            image_file_b64: file.buffer.toString("base64"),
            size: "auto",
          },
          headers: {
            "X-Api-Key": process.env.XApiKey, // comes from .env
          },
          responseType: "arraybuffer",
        });

        return {
          originalname: file.originalname,
          mimetype: "image/png",
          buffer: Buffer.from(response.data, "binary"),
        };
      })
    );

    req.files = processedImages;
    next();
  } catch (err) {
    console.error("remove.bg error:", err.response?.data || err.message);
    return next(new ErrorAPI("Background removal failed", 500));
  }
};