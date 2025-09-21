const cartModel = require("../models/cart_model");
const productModel = require("../models/product_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

const calcTotalCartPriceAfterDiscount = (cart) => {
  let totalAfterDiscount = 0;
  cart.cartItems.forEach((item) => {
    const itemPrice = item.priceAfterDiscount ?? item.price;
    totalAfterDiscount += itemPrice * item.quantity;
  });
  cart.totalPriceAfterDiscount = totalAfterDiscount;
  return totalAfterDiscount;
};

const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color, size, userId, quantity } = req.body;

  // 1) check if product exists
  const product = await productModel.findById(productId);
  if (!product) {
    return next(new ErrorAPI(`No product found with ID ${productId}`, 404));
  }

  // 2) find the user's cart
  let cart = await cartModel.findOne({ user: userId });

  if (!cart) {
    // 🔹 If no cart exists, create a new one with this product
    cart = await cartModel.create({
      user: userId,
      cartItems: [
        {
          product: productId,
          color,
          size,
          quantity,
          price: product.price,
          priceAfterDiscount: product.priceAfterDiscount || undefined,
        },
      ],
    });
  } else {
    // 🔹 If cart exists, check if product already in cart with same color/size
    const productIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (productIndex > -1) {
      // If product exists → increase quantity
      cart.cartItems[productIndex].quantity += 1;
    } else {
      // If product does not exist → push new product
      cart.cartItems.push({
        product: productId,
        color,
        size,
        price: product.price,
        priceAfterDiscount: product.priceAfterDiscount || undefined,
      });
    }
  }
  calcTotalCartPrice(cart);
  calcTotalCartPriceAfterDiscount(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.params.userId });

  if (!cart) {
    return next(
      new ErrorAPI(`There is no cart for this user id : ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity, userId } = req.body;

  // 1) Find the cart for this user
  const cart = await cartModel.findOne({ user: userId });
  if (!cart) {
    return next(new ApiError(`There is no cart for user ${userId}`, 404));
  }

  // 2) Find the product inside cartItems
  const itemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === req.params.productId
  );

  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity = quantity;
  } else {
    return next(
      new ApiError(`No item found for productId: ${req.params.productId}`, 404)
    );
  }

  // 3) Recalculate totals
  calcTotalCartPrice(cart);
  calcTotalCartPriceAfterDiscount(cart);

  // 4) Save cart
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

const clearCart = asyncHandler(async (req, res, next) => {
  await cartModel.findOneAndDelete({ user: req.params.userId });
  res.status(204).send();
});

const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.params.userId },
    {
      $pull: { cartItems: { product: req.params.productId } },
    },
    { new: true }
  );

  if (!cart) {
    return next(
      new ApiError(`No cart found for user ${req.params.userId}`, 404)
    );
  }

  calcTotalCartPrice(cart);
  calcTotalCartPriceAfterDiscount(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

module.exports = {
  addProductToCart,
  getLoggedUserCart,
  updateCartItemQuantity,
  clearCart,
  removeSpecificCartItem,
};
