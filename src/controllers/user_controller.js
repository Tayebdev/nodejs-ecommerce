const userModel = require("../models/user_model");
const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} = require("./Factory_Handler");

const createUser = createOne(userModel);

const getAllUser = getAll(userModel);

const getUserById = getOne(userModel);

const updateUser = updateOne(userModel);

const deleteUser = deleteOne(userModel);

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
};
