const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product_controller");
const { verifyToken, allowedTo } = require("../middlewares/authMiddleware");
const { uploadImage } = require("../middlewares/imageMiddleware");
const { resizeImageMany } = require("../middlewares/resizeMiddleware");
const {removeBgFromImages}=require('../middlewares/removeBackgroundMiddlware')

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  validateUploadedImages
} = require("../utils/validator/productValidator");

router
  .route("/")
  .post(
    // verifyToken,
    // allowedTo("admin", "manager"),
    uploadImage().array("images", 10),
    removeBgFromImages,
    validateUploadedImages,
    resizeImageMany(256, 256, "products"),
    createProductValidator,
    createProduct
  )
  .get(getAllProduct);

router
  .route("/id/:id")
  .get(getProductValidator, getProductById)
  .put(
    verifyToken,
    allowedTo("admin", "manager"),
    updateProductValidator,
    updateProduct
  )
  .delete(
    verifyToken,
    allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
