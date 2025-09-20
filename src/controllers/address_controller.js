const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const {
  deleteOne,
  createOne,
  getOne,
  getAll,
  updateOne,
} = require("./Factory_Handler");

const AddressModel = require("../models/address_model");

const createAddress = createOne(AddressModel);
const getAllAddress = getAll(AddressModel);
const getAddressById = getOne(AddressModel);
const updateAddress = updateOne(AddressModel);
const deleteAddress = deleteOne(AddressModel);

const getAddressByUserId = asyncHandler(async (req, res, next) => {
  const addresses = await AddressModel.find({ userId: req.params.userId });

  if (!addresses || addresses.length === 0) {
    return res.status(200).json({
    data: addresses,
    message:"No addresses found for this user"
  });
  }

  res.status(200).json({
    status: "success",
    results: addresses.length,
    data: addresses,
  });
});

module.exports = {
  createAddress,
  getAllAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAddressByUserId,
};
