const userModel = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const { createOne, getAll, getOne, deleteOne } = require("./Factory_Handler");

const createUser = createOne(userModel);

const getAllUser = getAll(userModel);

const getUserById = getOne(userModel);

const updateUser = asyncHandler(async (req, res, next) => {
  const User = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      lastName: req.body.lastName,
      firstName:req.body.firstName,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    { new: true }
  );
  if (!User || User.length === 0) {
    return next(new ErrorAPI(`No User Found`, 404));
  }
  res.status(200).json({
    status: `success`,
    message: `User is Updated`,
    data: User,
  });
});

const changeUserPassword = asyncHandler(async (req, res, next) => {
  const User = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt:Date.now()
     },
    { new: true }
  );
  if (!User || User.length === 0) {
    return next(new ErrorAPI(`No User Found`, 404));
  }
  res.status(200).json({
    status: `success`,
    message: `User password is Updated`,
    data: User,
  });
});

const deleteUser = deleteOne(userModel);

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  changeUserPassword,
};
