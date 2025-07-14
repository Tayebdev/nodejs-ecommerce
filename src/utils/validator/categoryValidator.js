const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid Category Id format"),
  runValidation,
];

exports.getCategoryValidatorByName = [
  check("name")
    .isAlpha()
    .isLength({ min: 3, max: 15 })
    .withMessage("Invalid Category Id format"),
  runValidation,
];

exports.createCategory = [
  check("name")
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 30 })
    .withMessage("Too long category name"),
  runValidation,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id format"),
  runValidation,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id format"),
  runValidation,
];
