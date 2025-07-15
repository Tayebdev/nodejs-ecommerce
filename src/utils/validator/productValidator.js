const { check, body } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");
const CategoryModel = require("../../models/category_model");
const subCategoryModel = require("../../models/subCategory_model");
const BrandModel = require("../../models/brand_model");
exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .notEmpty()
    .withMessage("Product title is required"),

  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("sold").optional().isNumeric().withMessage("Sold must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat()
    .withMessage("Product price must be a number"),

  check("priceAfterDiscount")
    .optional()
    .isFloat()
    .withMessage("Product priceAfterDiscount must be a number")
    .custom((value, { req }) => {
      if (req.body.price && parseFloat(value) >= parseFloat(req.body.price)) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors should be an array of strings"),

  check("imageCover").notEmpty().withMessage("Product imageCover is required"),

  check("image")
    .optional()
    .isArray()
    .withMessage("Images should be an array of strings"),

  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid category ID format")
    .custom((categoryId) => {
      return CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      });
    }),

  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subCategory ID format")
    .custom((subCategoryId) => {
      return subCategoryModel.findById(subCategoryId).then((subCategory) => {
        if (!subCategory) {
          return Promise.reject(
            new Error(`No subCategory for this id: ${subCategoryId}`)
          );
        }
      });
    }),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid brand ID format")
    .custom((brandId) => {
      return BrandModel.findById(brandId).then((brand) => {
        if (!brand) {
          return Promise.reject(new Error(`No brand for this id: ${brandId}`));
        }
      });
    }),
    
  check("ratingAverage")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0"),

  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Rating quantity must be a number"),

  runValidation,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID format"),
  runValidation,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID format"),
  runValidation,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID format"),
  runValidation,
];
