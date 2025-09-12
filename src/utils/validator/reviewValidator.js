const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.getReviewValidatorById = [
  check("product").isMongoId().withMessage("Invalid Product ID format"),
  runValidation,
];

exports.createReviewValidator = [
  check("review")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short review text")
    .isLength({ max: 500 })
    .withMessage("Too long review text"),

  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0"),

  check("product")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),

  check("user")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID format"),

  runValidation,
];

exports.updateReviewValidator = [
  check("review")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short review text")
    .isLength({ max: 500 })
    .withMessage("Too long review text"),

  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0"),

  check("responseReview")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short response text")
    .isLength({ max: 500 })
    .withMessage("Too long response text"),

  runValidation,
];

exports.deleteReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review ID format"),
  runValidation,
];
