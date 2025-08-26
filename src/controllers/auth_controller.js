const userModel = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const { generateAccessToken } = require("../utils/generate_Token");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
  htmlMessageResetCode,
  htmlMessageverifyEmail,
} = require("../utils/messageEmail");

const signUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, role, password } = req.body;
  const user = await userModel({
    firstName,
    lastName,
    email,
    phone,
    role,
    password,
  });

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedVerifyCode = crypto
    .createHash("sha256")
    .update(verifyCode)
    .digest("hex");
  user.emailVerifiedCode = hashedVerifyCode;

  const savedUser = await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject:
        "A verification code has been sent to your email. Please check your inbox to verify your account.",
      html: htmlMessageverifyEmail(user.firstName, user.lastName, verifyCode),
    });
  } catch (err) {
    user.emailVerifiedCode = undefined;
    await user.save();
    return next(new ErrorAPI("There is an error in sending email", 500));
  }

  const token = generateAccessToken({
    _id: user.id,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  res.status(201).json({
    status: "success",
    messge:
      "A verification code has been sent to your email. Please check your inbox to verify your account.",
    data: savedUser,
    token,
  });
});

const logIn = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await userModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ErrorAPI("Incorrect email or password", 401));
  }
  // 3) generate token
  const token = generateAccessToken({
    _id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorAPI(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();
  // 3) Send the reset code via email
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code",
      html: htmlMessageResetCode(user.name, resetCode),
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ErrorAPI("There is an error in sending email", 500));
  }
  res
    .status(200)
    .json({ status: "Success", message: `Reset code sent to email` });
});

const verifyEmailCode = asyncHandler(async (req, res, next) => {
  const hashedVerifyCode = crypto
    .createHash("sha256")
    .update(req.body.emailVerifiedCode)
    .digest("hex");

  const user = await userModel.findOneAndUpdate(
    {
      email: req.body.email,
      emailVerifiedCode: hashedVerifyCode,
    },
    {
      emailVerified: true,
      emailVerifiedCode: undefined,
    },
    { new: true }
  );

  if (!user) {
    return next(new ErrorAPI("Verification code invalid or expired", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Email verified successfully.",
  });
});

const verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.passwordResetCode)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorAPI("Reset code invalid or expired", 400));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Reset code verified. You can now reset your password.",
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorAPI(`There is no user with email ${req.body.email}`, 404)
    );
  }
  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ErrorAPI("Reset code not verified", 400));
  }
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();
  // 3) if everything is ok, generate token
  const token = generateAccessToken({
    _id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  res.status(200).json({ token });
});

module.exports = {
  signUp,
  logIn,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
  verifyEmailCode,
};
