const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
  runValidation,
];

exports.getSubCategoryValidatorByCategoryId = [
  check("category").isMongoId().withMessage("Invalid Category ID format"),
  runValidation,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Subcategory name is required")
    .isLength({ min: 3 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 30 })
    .withMessage("Too long Subcategory name"),

  check("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID format"),

  runValidation,
];

exports.updateSubCategoryValidator = [
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 30 })
    .withMessage("Too long Subcategory name"),

  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid Category ID format"),

  runValidation,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
  runValidation,
];
