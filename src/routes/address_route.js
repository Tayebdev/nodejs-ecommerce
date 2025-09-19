const express = require("express");
const router = express.Router();

const {
  createAddress,
  getAllAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAddressByUserId,
} = require("../controllers/address_controller");

const {
  createAddressValidator,
  getAddressValidator,
  updateAddressValidator,
  deleteAddressValidator,
} = require("../utils/validator/addressValidator");

router
  .route("/")
  .post(createAddressValidator, createAddress)
  .get(getAllAddress);

router.get("/user/:userId", getAddressByUserId);

router
  .route("/id/:id")
  .get(getAddressValidator, getAddressById)
  .put(updateAddressValidator, updateAddress)
  .delete(deleteAddressValidator, deleteAddress);

module.exports = router;
