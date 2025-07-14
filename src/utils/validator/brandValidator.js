const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand is required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 30 })
    .withMessage("Too long Brand name"),
  runValidation,
];
exports.getBrandByIdValidator=[
    check("id").isMongoId().withMessage('Invalid Brand Id format'),
    runValidation
]
exports.updateBrandByIdValidator=[
    check("id").isMongoId().withMessage('Invalid Brand Id format'),
    runValidation
]
exports.deleteBrandByIdValidator=[
    check("id").isMongoId().withMessage('Invalid Brand Id format'),
    runValidation
]
