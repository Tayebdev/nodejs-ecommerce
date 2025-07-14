const express = require("express");
const router = express.Router();
const {
  getCategoryValidatorById,
  getCategoryValidatorByName,
  updateCategoryValidator,
  deleteCategoryValidator
} = require("../utils/validator/categoryValidator");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  updateCatgeory,
  deleteCategory,
} = require("../controllers/category_controller");

router.route("/").post(createCategory).get(getAllCategory);

router
  .route("/id/:id")
  .get(getCategoryValidatorById, getCategoryById)
  .put(updateCategoryValidator,updateCatgeory)
  .delete(deleteCategoryValidator,deleteCategory);

router.get("/name/:name", getCategoryValidatorByName, getCategoryByName);

module.exports = router;
