const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product_controller");

const {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator}=require('../utils/validator/productValidator')

router.route("/").post(createProductValidator,createProduct).get(getAllProduct);

router
  .route("/id/:id")
  .get(getProductValidator,getProductById)
  .put(updateProductValidator,updateProduct)
  .delete(deleteProductValidator,deleteProduct);


module.exports = router;
