const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.getFavoriteValidatorById = [
  check("id").isMongoId().withMessage("Invalid Favorite ID format"),
  runValidation,
];

exports.createFavoriteValidator = [
  check("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID format"),

  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),

  runValidation,
];

exports.deleteFavoriteValidator = [
  check("id").isMongoId().withMessage("Invalid Favorite ID format"),
  runValidation,
];
