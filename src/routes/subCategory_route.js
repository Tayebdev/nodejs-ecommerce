const express = require("express");
const router = express.Router();
const {
  createSubCategoryValidator,
  getSubCategoryValidatorById,
  getSubCategoryValidatorByCategoryId,
  deleteSubCategoryValidator,
  updateSubCategoryValidator
} = require("../utils/validator/SubCategoryValidator");
const {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  getSubCategoryByCategoryId,
} = require("../controllers/subCategory_controller");

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getAllSubCategory);
router
  .route("/id/:id")
  .get(getSubCategoryValidatorById, getSubCategoryById)
  .put(updateSubCategoryValidator,updateSubCategory)
  .delete(deleteSubCategoryValidator,deleteSubCategory);

router
  .route("/category/:category")
  .get(getSubCategoryValidatorByCategoryId, getSubCategoryByCategoryId);

module.exports = router;
