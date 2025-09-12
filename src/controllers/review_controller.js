const reviewModel = require("../models/review_model");
const {
  deleteOne,
  createOne,
  getAll,
  updateOne,
} = require("./Factory_Handler");
const asyncHandler = require("express-async-handler");

const createReview = createOne(reviewModel);

const getReviewByProductId = asyncHandler(async (req, res, next) => {
  const reviews = await reviewModel.find({ product: req.params.productId });
  if (!reviews || reviews.length === 0) {
    return next(new ErrorAPI(`No reviews found for this product`, 404));
  }
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

const getAllReview = getAll(reviewModel);

const updateReview = updateOne(reviewModel);

const deleteReview = deleteOne(reviewModel);

module.exports = {
  createReview,
  getReviewByProductId,
  getAllReview,
  updateReview,
  deleteReview,
};
