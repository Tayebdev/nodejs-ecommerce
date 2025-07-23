const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  forgotPassword,
} = require("../controllers/auth_controller");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validator/authValidator");

router.post("/signup", signupValidator, signUp);
router.post("/login", loginValidator, logIn);
router.post("/forgotPassword", forgotPassword);
module.exports = router;
