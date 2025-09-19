const favoriteModel = require("../models/favorite_model");
const productModel = require("../models/product_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const {
  deleteOne,
  createOne,
  getOne,
  getAll,
  updateOne,
} = require("./Factory_Handler");

const createFavorite = asyncHandler(async (req, res) => {
  const doc = new favoriteModel(req.body);
  await productModel.updateOne(
    { _id: req.body.productId },
    { $set: { isFavorite: true } }
  );
  const savedDoc = await doc.save();

  res.status(201).json({
    status: "success",
    data: savedDoc,
  });
});

const getAllFavorite = getAll(favoriteModel);

const getFavoriteById = getOne(favoriteModel);

const updateFavorite = updateOne(favoriteModel);

const deleteFavorite = deleteOne(favoriteModel);

const getProductFavoriteByUserId = asyncHandler(async (req, res, next) => {
  const result = await favoriteModel
    .find({ userId: req.params.userId })
    .populate({
      path: "productId",
      select: " ",
    });

  if (!result || result.length === 0) {
    return res.status(200).json({
      message:"Favorite not found",
      status: "failed",
      data: result,
    });
  }

  res.status(200).json({
    result: result.length,
    status: "success",
    data: result,
  });
});

const deleteFavoriteByProductId = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const doc = await favoriteModel.findOneAndDelete({ productId });
  if (!doc) {
    return next(new ErrorAPI(`Favorite not found`, 404));
  }
  await productModel.updateOne(
    { _id: productId },
    { $set: { isFavorite: false } }
  );
  res.status(200).json({
    status: "Success",
    message: `Favorite deleted successfully`,
    data: doc,
  });
});

module.exports = {
  createFavorite,
  getAllFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getProductFavoriteByUserId,
  deleteFavoriteByProductId,
};
