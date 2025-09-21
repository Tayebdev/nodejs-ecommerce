const express = require("express");
const router = express.Router();

const {
  addProductToCart,
  getLoggedUserCart,
  updateCartItemQuantity,
  clearCart,
  removeSpecificCartItem,
} = require("../controllers/cart_controller");

router.route("/").post(addProductToCart);
router.route("/userId/:userId").get(getLoggedUserCart).delete(clearCart);
router.route("/updateQuantity/:productId").put(updateCartItemQuantity);
router.route("/:userId/item/:productId").delete(removeSpecificCartItem);

module.exports = router;
