const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");

// =============== CREATE ADDRESS VALIDATOR ===============
exports.createAddressValidator = [
  check("userId")
    .notEmpty()
    .withMessage("UserId is required")
    .isMongoId()
    .withMessage("Invalid UserId format"),

  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  check("street").notEmpty().withMessage("Street is required"),

  check("postalCode").notEmpty().withMessage("Postal code is required"),

  check("city").notEmpty().withMessage("City is required"),

  check("state").notEmpty().withMessage("State is required"),

  check("country").notEmpty().withMessage("Country is required"),

  runValidation,
];

// =============== GET ADDRESS BY ID VALIDATOR ===============
exports.getAddressValidator = [
  check("id").isMongoId().withMessage("Invalid address ID format"),
  runValidation,
];

// =============== UPDATE ADDRESS VALIDATOR ===============
exports.updateAddressValidator = [
  check("id").isMongoId().withMessage("Invalid address ID format"),

  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  check("street").optional().isString().withMessage("Invalid street"),

  check("postalCode").optional().isString().withMessage("Invalid postal code"),

  check("city").optional().isString().withMessage("Invalid city"),

  check("state").optional().isString().withMessage("Invalid state"),

  check("country").optional().isString().withMessage("Invalid country"),

  runValidation,
];

// =============== DELETE ADDRESS VALIDATOR ===============
exports.deleteAddressValidator = [
  check("id").isMongoId().withMessage("Invalid address ID format"),
  runValidation,
];
