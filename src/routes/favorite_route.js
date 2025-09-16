const express = require("express");
const router = express.Router();

const {
  createFavoriteValidator,
  getFavoriteValidatorById,
  deleteFavoriteValidator,
} = require("../utils/validator/favoriteValidator");

const {
  createFavorite,
  getAllFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getProductFavoriteByUserId,
  deleteFavoriteByProductId,
} = require("../controllers/favorite_controller");

const { verifyToken, allowedTo } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(
    // verifyToken,
    // allowedTo("user", "admin"),
    createFavoriteValidator,
    createFavorite
  )
  .get(
    //verifyToken,
    getAllFavorite
  );

router
  .route("/id/:id")
  .get(getFavoriteValidatorById, getFavoriteById)
  .put(
    // verifyToken,
    // allowedTo("user", "admin"),
    getFavoriteValidatorById,
    updateFavorite
  )
  .delete(
    // verifyToken,
    // allowedTo("user", "admin"),
    deleteFavoriteValidator,
    deleteFavorite
  );

router.route("/userId/:userId").get(getProductFavoriteByUserId);
router.route("/productId/:productId").delete(deleteFavoriteByProductId);

module.exports = router;
