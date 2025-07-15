const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/user_controller");

const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
} = require("../utils/validator/userValidator");

router.route("/").post(createUserValidator, createUser).get(getAllUser);

router
  .route("/id/:id")
  .get(getUserValidator, getUserById)
  .delete(deleteUserValidator,deleteUser)
  .put(updateUserValidator,updateUser);

module.exports = router;
