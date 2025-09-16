const favoriteModel = require("../models/favorite_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const {
  deleteOne,
  createOne,
  getOne,
  getAll,
  updateOne,
} = require("./Factory_Handler");

const createFavorite = createOne(favoriteModel);

const getAllFavorite = getAll(favoriteModel);

const getFavoriteById = getOne(favoriteModel);

const updateFavorite = updateOne(favoriteModel);

const deleteFavorite = deleteOne(favoriteModel);

const getProductFavoriteByUserId = asyncHandler(async (req, res, next) => {
  const result = await favoriteModel
    .find({ userId: req.params.userId })
    .populate({
      path: "productId",
      select: "title description price images sizes brand category subCategory",
    });

  if (!result || result.length === 0) {
    return next(new ErrorAPI("No Product found", 404));
  }

  res.status(200).json({
    result: result.length,
    status: "success",
    data: result,
  });
});

const deleteFavoriteByProductId = asyncHandler(async (req, res, next) => {
  const doc = await favoriteModel.findOneAndDelete({
    productId: req.params.productId,
  });
  if (!doc || doc.length === 0) {
    return next(new ErrorAPI(`Favorite model not found`), 404);
  }
  res.status(200).json({
    status: "Success",
    message: `Favorite is deleted`,
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
