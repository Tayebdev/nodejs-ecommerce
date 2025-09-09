const express = require("express");
const router = express.Router();
const {
  createBrandValidator,
  getBrandByIdValidator,
  updateBrandByIdValidator,
  deleteBrandByIdValidator,
} = require("../utils/validator/brandValidator");
const {
  createBrand,
  getBrandById,
  getAllBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand_controller");
const { uploadImage } = require("../middlewares/imageMiddleware");
const { resizeImageOne } = require("../middlewares/resizeMiddleware");
const { verifyToken, allowedTo } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(getAllBrand)
  .post(
    // verifyToken,
    // allowedTo("admin", "manager"),
    uploadImage().single("image"),
    resizeImageOne(96, 96, "brands"),
    createBrandValidator,
    createBrand
  );
router
  .route("/id/:id")
  .get(getBrandByIdValidator, getBrandById)
  .put(updateBrandByIdValidator, updateBrand)
  .delete(deleteBrandByIdValidator, deleteBrand);

module.exports = router;
