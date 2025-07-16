const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");
const userModel = require("../../models/user_model");
exports.createUserValidator = [
  check("name").notEmpty().withMessage("User name is required"),

  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const user = await userModel.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Pssaword is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long")
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirmation) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),

  check("passwordConfirmation")
    .notEmpty()
    .withMessage("PasswordConfirmation id required"),

  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),

  check("profileImg")
    .optional()
    .isString()
    .withMessage("Invalid profile image URL"),

  runValidation,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  runValidation,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  runValidation,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  runValidation,
];
