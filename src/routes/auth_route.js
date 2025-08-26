const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
  verifyEmailCode
} = require("../controllers/auth_controller");
const {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
} = require("../utils/validator/authValidator");

router.post("/signup", signupValidator, signUp);
router.post("/login", loginValidator, logIn);
router.post("/forgotPassword", forgotPassword);
router.post("/passwordResetCode", verifyPassResetCode);
router.post("/resetPassword", resetPasswordValidator, resetPassword);
router.post("/verifyEmail",verifyEmailCode)

module.exports = router;
