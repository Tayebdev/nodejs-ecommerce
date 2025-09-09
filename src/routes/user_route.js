const express = require("express");
const router = express.Router();
const { uploadImage } = require("../middlewares/imageMiddleware");
const { resizeImageOne } = require("../middlewares/resizeMiddleware");
const {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  changeUserPassword,
} = require("../controllers/user_controller");

const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
  updateUserPasswordValidator,
} = require("../utils/validator/userValidator");


router
  .route("/")
  .post(
    uploadImage().single("profileImg"),
    resizeImageOne(96, 96, "users"),
    createUserValidator,
    createUser
  )
  .get(getAllUser);

router.put(
  "/changePassword/:id",
  updateUserPasswordValidator,
  changeUserPassword
);

router
  .route("/id/:id")
  .get(getUserValidator, getUserById)
  .delete(deleteUserValidator, deleteUser)
  .put(updateUserValidator, updateUser);

module.exports = router;
