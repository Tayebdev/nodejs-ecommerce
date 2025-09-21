const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1"],
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price must be greater than or equal to 0"],
        },
        priceAfterDiscount: {
          type: Number,
          min: [0, "Price must be greater than or equal to 0"],
        },
      },
    ],
    totalCartPrice: {
      type: Number,
      default: 0,
      min: [0, "Total cart price cannot be negative"],
    },
    totalPriceAfterDiscount: {
      type: Number,
      min: [0, "Discounted price cannot be negative"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
    },
  },
  {
    collection: "Cart",
    timestamps: true,
  }
);

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
