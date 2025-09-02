const express = require("express");
const router = express.Router();
const {
  createCategoryValidator,
  getCategoryValidatorById,
  getCategoryValidatorByName,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  updateCatgeory,
  deleteCategory,
} = require("../controllers/category_controller");

const { uploadImage } = require("../middlewares/imageMiddleware");
const { resizeImage } = require("../middlewares/resizeMiddleware");
const { verifyToken, allowedTo } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(
    // verifyToken,
    // allowedTo("admin", "manager"),
    uploadImage().single("image"),
    resizeImage(96, 96, "categories"),
    createCategoryValidator,
    createCategory
  )
  .get(getAllCategory);

router
  .route("/id/:id")
  .get(getCategoryValidatorById, getCategoryById)
  .put(
    verifyToken,
    allowedTo("admin", "manager"),
    updateCategoryValidator,
    updateCatgeory
  )
  .delete(
    verifyToken,
    allowedTo("admin", "manager"),
    deleteCategoryValidator,
    deleteCategory
  );

router.get("/name/:name", getCategoryValidatorByName, getCategoryByName);

module.exports = router;
