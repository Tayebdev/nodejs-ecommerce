const userModel = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const { generateAccessToken } = require("../utils/generate_Token");
const bcrypt = require("bcryptjs");

const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  const user = await userModel({ name, email, phone, role, password });
  const savedUser = await user.save();

  const token = generateAccessToken({
    _id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  res.status(201).json({
    status: "success",
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



module.exports = {
  signUp,
  logIn,
};
