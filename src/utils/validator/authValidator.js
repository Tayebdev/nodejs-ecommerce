const { check } = require("express-validator");
const { runValidation } = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const User = require("../../models/user_model");

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),

  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),

  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number")
    .custom(async (value) => {
      const user = await User.findOne({ phone: value });
      if (user) {
        throw new Error("Phone already in use");
      }
      return true;
    }),

  runValidation,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  runValidation,
];

exports.resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),
  
  check("newPassword").custom((newPassword, { req }) => {
    if (newPassword !== req.body.passwordConfirm) {
      throw new Error("Password confirmation does not match new password");
    }
    return true;
  }),
  runValidation
];

