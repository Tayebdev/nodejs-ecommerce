const express = require("express");
const router = express.Router();
const {
  createSubCategoryValidator,
  getSubCategoryValidatorById,
  getSubCategoryValidatorByCategoryId,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validator/SubCategoryValidator");
const {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  getSubCategoryByCategoryId,
} = require("../controllers/subCategory_controller");
const { verifyToken, allowedTo } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(
    // verifyToken,
    // allowedTo("admin", "manager"),
    createSubCategoryValidator,
    createSubCategory
  )
  .get(getAllSubCategory);
router
  .route("/id/:id")
  .get(getSubCategoryValidatorById, getSubCategoryById)
  .put(
    verifyToken,
    allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    verifyToken,
    allowedTo("admin", "manager"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

router
  .route("/category/:category")
  .get(getSubCategoryValidatorByCategoryId, getSubCategoryByCategoryId);

module.exports = router;
