const express = require("express");
const router = express.Router();

const {
  createReviewValidator,
  getReviewValidatorById,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validator/reviewValidator");

const {
  createReview,
  getAllReview,
  getReviewByProductId,
  updateReview,
  deleteReview,
} = require("../controllers/review_controller");

const { verifyToken, allowedTo } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(
    // verifyToken,
    // allowedTo("user", "admin"),
    createReviewValidator,
    createReview
  )
  .get(getAllReview);

router
  .route("/id/:id")
  .put(
    verifyToken,
    allowedTo("user", "admin"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    // verifyToken,
    // allowedTo("user", "admin"),
    deleteReviewValidator,
    deleteReview
  );

router
  .route("/product/:productId")
  .get(getReviewByProductId);

module.exports = router;
