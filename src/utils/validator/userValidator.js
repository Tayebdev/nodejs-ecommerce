const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");
const userModel = require("../../models/user_model");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("User firstName is required"),
  check("lastName").notEmpty().withMessage("User lastName is required"),

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
  check("name")
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(req.body.name);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const user = await userModel.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number")
    .custom(async (value, { req }) => {
      const user = await userModel.find({ phone: value });
      if (user) {
        throw new Error("Phone already in use");
      }
      return true;
    }),
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

exports.updateUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  
  check("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("You must enter your confirm password"),

  check("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (value, { req }) => {
      // 1) verify password
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }
      // 2) validate new password
      if (value != req.body.confirmPassword) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  runValidation,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  runValidation,
];
